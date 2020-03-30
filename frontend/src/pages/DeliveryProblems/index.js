import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  Container,
  SubmitButton,
  DeliveryProblemDescription,
  List,
  ListHeader,
  ListMain,
  ListActions,
  Title,
} from './styles';
import SearchInput from '~/components/SearchInput';
import DropdownMenu from '~/components/DropdownMenu';

import api from '~/services/api';

export default function DeliveryProblems() {
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [page, setPage] = useState(1);

  async function searchDeliveryProblem() {
    const response = await api.get('delivery/problems', {
      params: {
        page,
        q: '',
      },
    });

    setDeliveryProblems(response.data);
  }
  useEffect(() => {
    searchDeliveryProblem();
  }, [page]);

  return (
    <>
      <Title>
        <header>
          <h1>Problemas na entrega</h1>
        </header>
      </Title>
      <Container>
        <SearchInput placeholder="Buscar problemas" />
        <Link to="/RegisterDeliveryProblem">
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
          <span>Problema</span>
        </ListHeader>
        <ListHeader>
          <span>Ações</span>
        </ListHeader>

        {deliveryProblems.map((deliveryProblem) => (
          <>
            <ListMain key={deliveryProblem.id}>
              <span>#{deliveryProblem.id}</span>
            </ListMain>

            <ListMain>
              <DeliveryProblemDescription>
                {deliveryProblem.description}
              </DeliveryProblemDescription>
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
