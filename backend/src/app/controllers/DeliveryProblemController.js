import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/Deliveryproblem';
import File from '../models/File';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';
import { Op } from 'sequelize';
class DeliveryProblemController {
  async delete(req, res) {
    const schemaParamd = Yup.object(req.params).shape({
      delivery_id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schemaParamd.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { delivery_id } = req.params;
    const deliveryWithProblem = await DeliveryProblem.findOne({
      where: { delivery_id },
      attributes: ['id', 'delivery_id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'street',
                'street_number',
                'complement',
                'uf',
                'city',
                'postal_code',
              ],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'name', 'path', 'url'],
                },
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (!deliveryWithProblem) {
      return res
        .status(400)
        .json({ error: 'There is no problem for this delivery' });
    }

    if (
      deliveryWithProblem.delivery.canceled_at ||
      deliveryWithProblem.delivery.end_date ||
      !deliveryWithProblem.delivery.start_date
    ) {
      return res.status(400).json({ error: "You can't cancel this delivery!" });
    }

    deliveryWithProblem.delivery.canceled_at = new Date();
    await deliveryWithProblem.delivery.save();
    await Queue.add(CancellationMail.key, {
      deliveryWithProblem,
    });
    return res.json(deliveryWithProblem);
  }

  async index(req, res) {
    // paginação, mostra 9 resultados por página
    const { page = 1, q } = req.query; // caso não seja informado o número da página, por padrão será a página 1
    // retorna a lista de entregas com problemas
    const deliverieswithProblems = await DeliveryProblem.findAll({
      where: {
        description: {
          [Op.iLike]: `${q}%`,
        },
      },
      order: ['created_at'],
      attributes: ['id', 'delivery_id', 'description'],
      limit: 9, // lista somente 9 resultados
      offset: (page - 1) * 9, // serve para determina quantos registos eu quero pular
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'street',
                'street_number',
                'complement',
                'uf',
                'city',
                'postal_code',
              ],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'name', 'path', 'url'],
                },
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(deliverieswithProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    const schemaParamd = Yup.object(req.params).shape({
      delivery_id: Yup.number()
        .positive()
        .required(),
    });
    if (
      !(await schema.isValid(req.body)) ||
      !(await schemaParamd.isValid(req.params))
    ) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { delivery_id } = req.params;
    const { description } = req.body;

    const delivery = await Delivery.findByPk(delivery_id, {
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'street_number',
            'complement',
            'uf',
            'postal_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }
    if (delivery.canceled_at || delivery.end_date || !delivery.start_date) {
      return res
        .status(400)
        .json({ error: "You can't create a problem for this delivery!" });
    }

    const { id } = await DeliveryProblem.create({
      delivery_id: delivery.id,
      description,
    });

    return res.json({
      id,
      delivery,
      description,
    });
  }

  async show(req, res) {
    // Lista todos os problemas de uma entrega

    const schemaParamd = Yup.object(req.params).shape({
      id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schemaParamd.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id } = req.params;
    // console.log(id);
    // paginação, mostra 9 resultados por página
    const { page = 1 } = req.query; // caso não seja informado o número da página, por padrão será a página 1
    // retorna a lista de entregas com problemas
    const deliverieswithProblems = await DeliveryProblem.findAll({
      where: { delivery_id: id },
      order: ['created_at'],
      attributes: ['id', 'delivery_id', 'description', 'created_at'],
      limit: 9, // lista somente 9 resultados
      offset: (page - 1) * 9, // serve para determina quantos registos eu quero pular
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'street',
                'street_number',
                'complement',
                'uf',
                'city',
                'postal_code',
              ],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'name', 'path', 'url'],
                },
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(deliverieswithProblems);
  }
}
export default new DeliveryProblemController();
