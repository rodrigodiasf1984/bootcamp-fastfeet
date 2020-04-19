import * as Yup from 'yup';
import { parseISO, getHours, isBefore } from 'date-fns';
import { Op } from 'sequelize';
import File from '../models/File';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .positive()
        .required(),
      deliveryman_id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman)
      return res.status(400).json({ error: 'Deliveryman not found' });

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient)
      return res.status(400).json({ error: 'Recipient not found' });

    // const checkDeliveryExists = await Delivery.findOne({
    //   where: {
    //     recipient_id,
    //     deliveryman_id,
    //   },
    // });

    // if (checkDeliveryExists)
    //   return res.status(400).json({ error: 'Delivery already exists' });

    const delivery = await Delivery.create(req.body);
    await Queue.add(RegistrationMail.key, {
      delivery,
      recipient,
      deliveryman,
    });
    const { id } = delivery;
    return res.json({
      delivery: {
        id,
        product,
        recipient_id,
        deliveryman_id,
      },
    });
  }

  async delete(req, res) {
    const schemaParam = Yup.object(req.params).shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schemaParam.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists.' });
    }
    try {
      await delivery.destroy();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: 'Delivery deleted!' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number().positive(),
      deliveryman_id: Yup.number().positive(),
      signature_id: Yup.number().positive(),
    });
    const schemaParamd = Yup.object(req.params).shape({
      id: Yup.number()
        .positive()
        .required(),
    });
    if (
      !(await schema.isValid(req.body)) ||
      !(await schemaParamd.isValid(req.params))
    ) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);

    if (!delivery)
      return res.status(400).json({ error: 'Delivery does not exists' });

    const {
      deliveryman_id,
      recipient_id,
      signature_id,
      start_date,
      end_date,
    } = req.body;
    if (deliveryman_id && deliveryman_id !== delivery.deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);
      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not exists.' });
      }
    }

    if (recipient_id && recipient_id !== delivery.recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);
      if (!recipient) {
        return res.status(400).json({ error: 'Recipient does not exists.' });
      }
    }

    if (signature_id && signature_id !== delivery.signature_id) {
      const file = await File.findByPk(signature_id);
      if (!file) {
        return res.status(400).json({ error: 'File does not exists.' });
      }
    }
    // verifica se as horas quando forem alteradas, se as mesma estão entre 08:00 e  18:00

    const parsedStartDate = parseISO(start_date);
    const parsedEndDate = parseISO(end_date);
    // verifica se o utilizador não está inserindo uma data de inicio ou fim da entrega antes da data atual
    if (
      isBefore(parsedStartDate, new Date()) ||
      isBefore(parsedEndDate, new Date())
    ) {
      return res.status(400).json({
        error: "The start date or end date can not be before today's date",
      });
    }
    if (parsedStartDate) {
      const startHour = getHours(parsedStartDate);
      if (startHour <= 8 || startHour >= 18) {
        return res
          .status(400)
          .json({ error: 'The start hour must be between 08:00 and 18:00' });
      }
    }
    if (parsedEndDate) {
      const startHour = getHours(parsedStartDate);
      if (startHour <= 8 || startHour >= 18) {
        return res
          .status(400)
          .json({ error: 'The start hour must be between 08:00 and 18:00' });
      }
    }

    if (end_date && !start_date) {
      if (!delivery.start_date) {
        return res
          .status(400)
          .json({ error: 'The delivery must have a start date!' });
      }
    }

    if (start_date && end_date) {
      if (isBefore(parsedEndDate, parsedStartDate)) {
        return res
          .status(400)
          .json({ error: 'The end date can not be before the start date!' });
      }
    }

    const deliveryUpdated = await delivery.update(req.body);

    return res.json({ deliveryUpdated });
  }

  async index(req, res) {
    const { page = 1, q } = req.query; // caso não seja informado o número da página, por padrão será a página 1

    if (q !== "") {
      // buscar o deliveryman de acordo com o nome
      const deliveryByName = await Delivery.findAll({
        where: {
          product: {
            [Op.iLike]: `${q}%`,
          },
        },
        order: ['created_at'],
        attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
        limit: 9, // lista somente 20 resultados
        offset: (page - 1) * 9, // serve para determina quantos registos eu quero pular
        include: [
          // include faz o relacionamento entre o entrega e o entregador
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name'], // retorna somente os campos dentro do array attributes
            include: [
              {
                model: File,
                as: 'avatar', // as: avatar
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
          {
            model:File,
            as:'signature',
            attributes: ['name', 'path', 'url'],
          },
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
        ],
      });

      if(deliveryByName.length===0){
        return res.status(400).json('Delivery does not exists')
      }
      return res.json(deliveryByName);
    }

    const listDeliveries = await Delivery.findAll({
      order: ['created_at'],
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      limit: 9, // lista somente 9 resultados
      offset: (page - 1) * 9, // serve para determina quantos registos eu quero pular
      include: [
        // include faz o relacionamento entre o entrega e o entregador
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'], // retorna somente os campos dentro do array attributes
          include: [
            {
              model: File,
              as: 'avatar', // as: avatar
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model:File,
          as:'signature',
          attributes: ['name', 'path', 'url'],
        },
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
      ],
    });
    return res.json(listDeliveries);
  }
}
export default new DeliveryController();
