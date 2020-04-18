import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function DeliveryProblemModal({
  closeModal,
  modalIsOpen,
  deliveryData,
}) {

  // console.tron.log(deliveryData, 'modal');
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
        contentLabel="VISUALIZAR PROBLEMA"
        data={deliveryData}
      >
        <strong>VISUALIZAR PROBLEMA</strong>
        <Container>
          <span>{deliveryData}</span>
        </Container>
      </Modal>
    </div>
  );
}

DeliveryProblemModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.func.isRequired,
  deliveryData: PropTypes.shape().isRequired,
};
