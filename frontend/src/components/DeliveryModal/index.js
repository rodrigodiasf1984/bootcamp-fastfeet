import React from 'react';
import { Container, ProductName, Address, DateTitle } from './styles';
import Modal from 'react-modal'
export default function DeliveryModal({closeModal, modalIsOpen, deliveryData}) {
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
              overflow:'hidden',
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
          <div>{deliveryData.street},{' '}{deliveryData.street_number}{deliveryData.complement} </div>
          <div>{deliveryData.city}{' - '}{deliveryData.uf}</div>
        </Address>
        </Container>
        <Container>
          <DateTitle>
            <strong>Datas</strong>
          </DateTitle>
          <div>
            <strong>Retirada: </strong>
              {deliveryData.start_date}
          </div>
          <div>
            <strong>Entrega: </strong>
              {deliveryData.end_date}
          </div>
        </Container>
        <Container>
          <strong>Assinatura do destinatário</strong>
          <img src={deliveryData.signature_url} alt=""/>
        </Container>
      </Modal>
    </div>
  );
}
