import User from '../models/User';

export default async (req, res, next) => {
  const checkIsAdmin = await User.findOne({
    where: {
      id: req.userId, // utilizador que está logado
      is_admin: true,
    },
  });
  if (!checkIsAdmin) {
    return res
      .status(401)
      .json({ error: 'Access denied, only for admin users!' });
  }
  return next();
};
