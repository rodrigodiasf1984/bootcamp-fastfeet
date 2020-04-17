import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    // paginação, mostra 9 resultados por página
    const { page = 1, q } = req.query; // caso não seja informado o número da página, por padrão será a página 1

    if (q) {
      // buscar o recipient de acordo com o nome
      const recipientByName = await Recipient.findAll({
        where: {
          name: {
            [Op.iLike]: `${q}%`,
          },
        },
        order: ['created_at'],
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
        limit: 9, // lista somente 9 resultados
        offset: (page - 1) * 9, // serve para determina quantos registos eu quero pular
      });

      if(recipientByName.length>0){
        return res.json(recipientByName);
      }
      else{
        return res.status(400).json("Recipient does not exists");
      }
    }
    // retorna a lista de agendamento do utlizador que fez a requisição
    const listRecipients = await Recipient.findAll({
      order: ['created_at'],
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
      limit: 9, // lista somente 9 resultados
      offset: (page - 1) * 9, // serve para determina quantos registos eu quero pular
    });
    return res.json(listRecipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.number().required(),
      complement: Yup.string(),
      uf: Yup.string()
        .required()
        .max(2),
      city: Yup.string().required(),
      postal_code: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });
    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }
    if (!req.body.complement) {
      delete req.body.complement;
    }
    const recipient = await Recipient.create(req.body);
    const {
      id,
      name,
      street,
      street_number,
      complement,
      uf,
      city,
      postal_code,
    } = recipient;
    return res.json({
      id,
      name,
      street,
      street_number,
      complement,
      uf,
      city,
      postal_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string().when('postal_code', (postal_code, field) =>
        postal_code ? field.required() : field
      ),
      // verifica se a rua estiver preenchida se sim, torna o campo street_number obrigatório
      street_number: Yup.string().when('street', (street, field) =>
        street ? field.required() : field
      ),
      complement: Yup.string(),
      uf: Yup.string()
        .max(2) // verifica se a cidade estiver preenchida se sim, torna o campo uf obrigatório
        .when('city', (city, field) => (city ? field.required() : field)),
      // verifica se o cep estiver preenchido se sim, torna o campo city obrigatório
      city: Yup.string().when('postal_code', (postal_code, field) =>
        postal_code ? field.required() : field
      ),
      // verifica se a rua estiver preenchido se sim, torna o campo postal_code obrigatório
      postal_code: Yup.string(),
    });
    const schemaParamd = Yup.object(req.params).shape({
      id: Yup.number().required(),
    });
    // verifica se o corpo da requisição foi devidamente preenchido ou se o parâmetro é um número
    if (
      !(await schema.isValid(req.body)) ||
      !(await schemaParamd.isValid(req.params))
    ) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    if (!req.params.id) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id } = req.params;
    const { name } = req.body;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }
    if (name !== recipient.name) {
      const recipientExists = await Recipient.findOne({ where: { name } });
      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists.' });
      }
    }

    const {
      street,
      street_number,
      complement,
      uf,
      city,
      postal_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      street_number,
      complement,
      uf,
      city,
      postal_code,
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
    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }
    try {
      await recipient.destroy();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'Recipient deleted!' });
  }
}
export default new RecipientController();
