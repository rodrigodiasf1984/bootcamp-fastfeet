import Sequelize from 'sequelize';
import User from '../app/models/User'; // import dos Models
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';
import DeliveryProblem from '../app/models/Deliveryproblem';
import File from '../app/models/File'; // import dos Models
import Recipient from '../app/models/Recipient'; // import dos Models
import databaseConfig from '../config/database';

const models = [User, Recipient, File, Deliveryman, Delivery, DeliveryProblem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // carrega o Model e faz a conexão com a BD
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      // é preciso verificar se a ssociação existe para o model, se sim chama o método que fará a associação, neste caso associate()
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
