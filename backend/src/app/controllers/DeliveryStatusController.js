import * as Yup from 'yup';
import File from '../models/File';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class DeliveryStatusController {
  // Entrega da encomenda
  async update(req, res) {
    // const schema = Yup.object().shape({
    //   end_date: Yup.string().required(),
    // });

    const schemaParamd = Yup.object(req.params).shape({
      deliveryman_id: Yup.number()
        .positive()
        .required(),
      delivery_id: Yup.number()
        .positive()
        .required(),
    });

    // await schema.validate(req.query).catch(function(err) {
    //   return res.status(400).json(`{${err.name} : ${err.errors} }`);
    // });
    await schemaParamd.isValid(req.params).catch(function(err) {
      return res.status(400).json(`{${err.name} : ${err.errors} }`);
    });

    const { deliveryman_id, delivery_id } = req.params;
    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery.start_date) {
      return res.status(400).json({
        error: 'This delivery does not have a start date.',
      });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists.' });
    }


    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'The signature file must be send.' });
    }

    if (Number(deliveryman_id) !== delivery.deliveryman_id) {
      return res.status(400).json({
        error: 'You dont have the permission to change this delivery.',
      });
    }

    // const { end_date } =new Date;
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });
    const deliveryUpdated = await delivery.update({
      end_date:new Date,
      signature_id: file.id,
    });

    return res.json(deliveryUpdated);
  }
}

export default new DeliveryStatusController();
