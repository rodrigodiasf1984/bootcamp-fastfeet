import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  Container,
  SubmitButton,
  RecipientName,
  List,
  ListHeader,
  ListMain,
  ListActions,
  Title,
} from './styles';
import SearchInput from '~/components/SearchInput';
import DropdownMenu from '~/components/DropdownMenu';

import api from '~/services/api';

export default function Recipients() {
  const [recipients, setRecipient] = useState([]);
  const [page, setPage] = useState(1);

  async function searchRecipient() {
    const response = await api.get('recipients', {
      params: {
        page,
        q: '',
      },
    });

    setRecipient(response.data);
  }
  useEffect(() => {
    searchRecipient();
  }, [page]);

  return (
    <>
      <Title>
        <header>
          <h1>Gerenciamento de destinatários</h1>
        </header>
      </Title>
      <Container>
        <SearchInput placeholder="Buscar destinatários" />
        <Link to="/RegisterRecipients">
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
          <span>Nome</span>
        </ListHeader>
        <ListHeader>
          <span>Endereço</span>
        </ListHeader>
        <ListHeader>
          <span>Ações</span>
        </ListHeader>

        {recipients.map((recipient) => (
          <>
            <ListMain key={recipient.id}>
              <span>#{recipient.id}</span>
            </ListMain>

            <ListMain>
              <RecipientName>{recipient.name}</RecipientName>
            </ListMain>
            <ListMain>
              <span>
                {recipient.street}, {recipient.street_number},{' '}
                {recipient.complement}, {recipient.city}, {recipient.uf}
              </span>
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
