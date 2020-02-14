import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { deliveryman, delivery, recipient } = data;
    Mail.sendMail({
      to: `${deliveryman.name}<${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'registration',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product: delivery.product,
      },
    });
  }
}
export default new RegistrationMail();
