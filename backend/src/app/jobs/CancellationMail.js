import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliveryWithProblem } = data;
    console.log(deliveryWithProblem, 'Problem');
    Mail.sendMail({
      to: `${deliveryWithProblem.delivery.deliveryman.name}<${deliveryWithProblem.delivery.deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancellation',
      context: {
        deliveryman: deliveryWithProblem.delivery.deliveryman.name,
        recipient: deliveryWithProblem.delivery.recipient.name,
        product: deliveryWithProblem.delivery.product,
        description: deliveryWithProblem.description,
      },
    });
  }
}
export default new CancellationMail();
