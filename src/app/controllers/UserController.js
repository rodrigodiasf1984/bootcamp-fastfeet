import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // validar se os campos da requisição estão devidamente preenchidos.
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // Esta função recebe os dados e criar um novo user na BD
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // verifica se o utilizador existe na BD
    if (userExists) {
      // se o userExists ==true retorna o erro abaixo
      return res.status(400).json({ error: 'User already exists.' });
    }
    // senão existir na BD cria novo user
    const { id, name, email, provider } = await User.create(req.body);
    // retorna um objeto json somente com os campos necessários
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    // validar se os campos da requisição estão devidamente preenchidos.
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(400).json({ error: 'User does not exists.' });
    }
    if (email && email !== user.email) {
      // verifica se o email enviado é igual ao email na BD
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        // se o userExists ==true retorna o erro abaixo
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);
    return res.json({ id, name, email, provider });
  }
}
export default new UserController();
