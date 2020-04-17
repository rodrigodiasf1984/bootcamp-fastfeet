import * as Yup from 'yup';
import { parseISO, getHours, startOfDay, endOfDay, isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class PickUpDeliveryController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.string().required(),
    });
    const schemaParamd = Yup.object(req.params).shape({
      deliveryman_id: Yup.number()
        .positive()
        .required(),
      delivery_id: Yup.number()
        .positive()
        .required(),
    });
    if (
      !(await schema.isValid(req.body)) ||
      !(await schemaParamd.isValid(req.params))
    ) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id, delivery_id } = req.params;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists.' });
    }
    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    if (Number(deliveryman_id) !== delivery.deliveryman_id) {
      return res.status(400).json({
        error: 'You dont have the permission to change this delivery.',
      });
    }

    if (delivery.canceled_at || delivery.end_date || delivery.start_date) {
      return res
        .status(400)
        .json({ error: "You can't pick up this delivery!" });
    }
    const date= new Date();
    const { start_date } = req.body; // a data que vem do corpo da requição vem no formato de uma string
    const parsedStartDate = parseISO(start_date); // por este motivo temos que converter para data

    if (isBefore(parsedStartDate, startOfDay(date))) {
      return res.status(400).json({
        error: "The start date can not be before today's date",
      });
    }

    if (parsedStartDate) {
      const startHour = getHours(parsedStartDate);
      if (startHour <= 8 || startHour >= 18) {
        return res
          .status(400)
          .json({ error: 'The start hour must be between 08:00 and 18:00' });
      }
    }
    const deliveries = await Delivery.findAndCountAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [
            startOfDay(parsedStartDate),
            endOfDay(parsedStartDate),
          ],
        },
        end_date: null,
      },
    });
    if (deliveries.count >= 5) {
      return res
        .status(400)
        .json({ error: 'You can only pick up 5 deliveries per day' });
    }
    const deliveryUpdated = await delivery.update(req.body);

    return res.json(deliveryUpdated);
  }
}
export default new PickUpDeliveryController();
