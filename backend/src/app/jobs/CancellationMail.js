import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliveryProblem } = data;
    if(deliveryProblem)
    Mail.sendMail({
      to: `${deliveryProblem.deliveryman.name}<${deliveryProblem.deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancelation',
      context: {
        deliveryman: deliveryProblem.deliveryman.name,
        recipient: deliveryProblem.recipient.name,
        product: deliveryProblem.delivery.product,
        description: deliveryProblem.DeliveryProblem.description,
      },
    });
  }
}
export default new CancellationMail();
