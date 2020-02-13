import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    // belongsTo=>faz a associação do deliveryman com o file, quer dizer que a tabela deliveryman terá o id do file
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}
export default Deliveryman;
