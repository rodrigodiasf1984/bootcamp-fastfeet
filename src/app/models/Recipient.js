import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        street_number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        uf: Sequelize.STRING,
        city: Sequelize.STRING,
        postal_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}
export default Recipient;
