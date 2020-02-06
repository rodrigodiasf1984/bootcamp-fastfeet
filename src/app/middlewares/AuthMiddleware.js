import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization; // recupera o token do header da requisição
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provied.' });
  }
  const [, token] = authHeader.split(' '); // recupera somente o token retirando a palavra Bearer

  try {
    // o decoded retorna o id do user se o token for válido
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); // verificar se o token está correto
    req.userId = decoded.id;
    return next(); // se chegou até aqui o user pode acessar o controller visto que o mesmo já está autenticado
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }
};
