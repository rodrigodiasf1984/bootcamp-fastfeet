import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class ShowDeliveriesController {
  async index(req, res) {
    const schemaParamd = Yup.object(req.params).shape({
      id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schemaParamd.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists.' });
    }
    const { page = 1, filter = 'false' } = req.query; // caso não seja informado o número da página, por padrão será a página 1

    const deliveries = await Delivery.findAll({
      // se o filtro vier true, retorna somente as encomendas já entregues
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: filter === 'true' ? { [Op.ne]: null } : null,
      },
      order: ['created_at'],
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at', 'createdAt'],
      limit: 9, // lista somente 9 resultados
      offset: (page - 1) * 9, // serve para determina quantos registos eu quero pular
      include: [
        // include faz o relacionamento entre o entrega e o entregador
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'], // retorna somente os campos dentro do array attributes
          include: [
            {
              model: File,
              as: 'avatar', // as: avatar
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
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
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json( deliveries );
  }
}

export default new ShowDeliveriesController();
