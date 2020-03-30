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

export default function Deliveries() {
  const [packages, setPackages] = useState([]);
  const [page, setPage] = useState(1);

  async function searchPackages() {
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

    setPackages(response.data);
  }
  useEffect(() => {
    searchPackages();
  }, [page]);

  return (
    <>
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

        {packages.map((delivery) => (
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
              {console.tron.log(delivery.status)}
            </ListMain>
            <ListActions>
              <DropdownMenu inPackages />
            </ListActions>
          </>
        ))}
      </List>
    </>
  );
}
