import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        is_admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    // Antes de qualquer user ser criado ou editado, encrypta o a senha enviada pelo utilizador dentro da variável virtual password, afectando o valor da mesma na variável password_hash par que a senha seja salva na bd encryptada
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    // verifica que a senha digitada pelo user(password) é igual a senha na BD(password_hash)
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
