import React from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import PropTypes from 'prop-types';
import { Container, ProductName, Address, DateTitle } from './styles';

export default function DeliveryModal({
  closeModal,
  modalIsOpen,
  deliveryData,
}) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // console.tron.log(deliveryData);
  const startDateFormatted = deliveryData.start_date
    ? format(
        utcToZonedTime(deliveryData.start_date, timezone),
        'dd/MM/yyyy HH:mm'
      )
    : null;

  const endDateFormatted = deliveryData.end_date
    ? format(
        utcToZonedTime(deliveryData.end_date, timezone),
        'dd/MM/yyyy HH:mm'
      )
    : null;

  const canceledDateFormatted = deliveryData.canceled_at
    ? format(
        utcToZonedTime(deliveryData.canceled_at, timezone),
        'dd/MM/yyyy HH:mm'
      )
    : null;
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          content: {
            maxWidth: '500px',
            maxHeight: '400px',
            border: '1px solid #ccc',
            background: '#fff',
            margin: 'auto',
            overflow: 'hidden',
          },
        }}
        contentLabel="Example Modal"
        data={deliveryData}
      >
        <Container>
          <strong>Informações da encomenda</strong>
          <ProductName>
            <strong>Nome do produto</strong>
            <div>{deliveryData.product}</div>
          </ProductName>
          <Address>
            <strong>Endereço de entrega</strong>
            <div>
              {deliveryData.street}, {deliveryData.street_number}
              {deliveryData.complement}{' '}
            </div>
            <div>
              {deliveryData.city}
              {' - '}
              {deliveryData.uf}
            </div>
          </Address>
        </Container>
        <Container>
          <DateTitle>
            <strong>Datas</strong>
          </DateTitle>
          <div>
            <strong>Retirada: </strong>
            {startDateFormatted}
          </div>
          <div>
            <strong>Entrega: </strong>
            {endDateFormatted}
          </div>

          {deliveryData.canceled_at && (
            <div>
              <strong>Cancelada: </strong>
              {canceledDateFormatted}
            </div>
          )}
        </Container>
        <Container>
          <strong>Assinatura do destinatário</strong>
          <img src={deliveryData.signature_url} alt="" />
        </Container>
      </Modal>
    </div>
  );
}

DeliveryModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.func.isRequired,
  deliveryData: PropTypes.shape().isRequired,
};
