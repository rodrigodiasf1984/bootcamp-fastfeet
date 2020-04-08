import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  Container,
  SubmitButton,
  DeliveryManName,
  List,
  ListHeader,
  ListMain,
  ListActions,
  AvatarIcon,
  DeliveryStatus,
  Title,
} from './styles';
import SearchInput from '~/components/SearchInput';
import DropdownMenu from '~/components/DropdownMenu';
import api from '~/services/api';
import Modal from '~/components/DeliveryModal';
import { toast } from 'react-toastify';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const[ modalIsOpen, setModalIsOpen]=useState(false);
  const[modalData, setModalData]=useState({});

  async function searchDeliveries() {
    const response = await api.get('deliveries', {
      params: {
        page,
        q: '',
      },
    });

    response.data.map((delivery) => {
      delivery.id = delivery.id < 10 ? `0${delivery.id}` : delivery.id;

      if (!delivery.start_date) {
        delivery.status = 'PENDENTE';
      }
      if (delivery.start_date && !delivery.end_date) {
        delivery.status = 'RETIRADA';
      }
      if (delivery.end_date) {
        delivery.status = 'ENTREGUE';
      }
      if (delivery.canceled_at) {
        delivery.status = 'CANCELADA';
      }

      return delivery;
    });

    setDeliveries(response.data);
  }
  useEffect(() => {
    searchDeliveries();
  }, [page]);

  function handleRequestClose(){
    setModalIsOpen(false);
  }

  async function handleDeleteDelivery(deleteDelivery){
    console.tron.log(deleteDelivery, 'apagar');
    await api.delete(`/deliveries/${deleteDelivery.id}`)
    .then(()=>{
      toast.success('Encomenda apagada com sucesso!');
      searchDeliveries();
    })
    .catch((err)=>{
      console.tron.log(err.response);
      toast.error(err.response);
    });
  }

  function handleRequestOpen(delivery){
    const{product, recipient, start_date, end_date, signature}=delivery;
    const deliveryData={
      product,
      street:recipient.street,
      street_number:recipient.street_number,
      complement: recipient.complement,
      uf:recipient.uf,
      city:recipient.city,
      postal_code:recipient.postal_code,
      start_date,
      end_date,
      signature_url:signature === null ? '' : signature.url,
    }
    setModalIsOpen(true);
    setModalData(deliveryData);
  }

  return (
    <>
    <Modal
      closeModal={handleRequestClose}
      modalIsOpen={modalIsOpen}
      deliveryData={modalData}
    />
      <Title>
        <header>
          <h1>Gerenciamento de encomendas</h1>
        </header>
      </Title>
      <Container>
        <SearchInput placeholder="Buscar encomendas" />
        <Link to="/RegisterDelivery">
          <SubmitButton>
            <MdAdd color="#fff" size={25} />
            <strong>CADASTRAR</strong>
          </SubmitButton>
        </Link>
      </Container>

      <List>
        <ListHeader>
          <span>ID</span>
        </ListHeader>
        <ListHeader>
          <span>Destinatário</span>
        </ListHeader>
        <ListHeader>
          <span>Entregador</span>
        </ListHeader>
        <ListHeader>
          <span>Cidade</span>
        </ListHeader>
        <ListHeader>
          <span>Estado</span>
        </ListHeader>
        <ListHeader>
          <span>status</span>
        </ListHeader>
        <ListHeader>
          <span>Ações</span>
        </ListHeader>

        {deliveries.map((delivery) => (
          <>
            <ListMain key={delivery.id}>
              <span>#{delivery.id}</span>
            </ListMain>
            <ListMain>
              <span>{delivery.recipient.name}</span>
            </ListMain>

            <ListMain>
              <AvatarIcon size={36} round name={delivery.deliveryman.name} />
              <DeliveryManName>{delivery.deliveryman.name}</DeliveryManName>
            </ListMain>

            <ListMain>
              <span>{delivery.recipient.city}</span>
            </ListMain>
            <ListMain>
              <span>{delivery.recipient.uf}</span>
            </ListMain>
            <ListMain>
              <DeliveryStatus status={delivery.status}>
                {delivery.status}
              </DeliveryStatus>
            </ListMain>
            <ListActions>
              <DropdownMenu inPackages delivery={delivery} editData={delivery} openModalFunction={handleRequestOpen} handleDelete={handleDeleteDelivery}/>
            </ListActions>
          </>
        ))}
      </List>
    </>
  );
}
