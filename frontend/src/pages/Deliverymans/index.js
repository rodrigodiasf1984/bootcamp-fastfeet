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
  Title,
  AvatarIcon,
} from './styles';
import SearchInput from '~/components/SearchInput';
import DropdownMenu from '~/components/DropdownMenu';

import api from '~/services/api';
import blankAvatar from '~/assets/blank-profile-picture.webp';

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [page, setPage] = useState(1);

  async function searchDeliverymans() {
    const response = await api.get('deliverymans', {
      params: {
        page,
        q: '',
      },
    });

    setDeliverymans(response.data);
  }
  useEffect(() => {
    searchDeliverymans();
  }, [page]);

  return (
    <>
      <Title>
        <header>
          <h1>Gerenciando entregadores</h1>
        </header>
      </Title>
      <Container>
        <SearchInput placeholder="Buscar entregadores" />
        <Link to="/RegisterDeliverymans">
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
          <span>Foto</span>
        </ListHeader>
        <ListHeader>
          <span>Nome</span>
        </ListHeader>
        <ListHeader>
          <span>Email</span>
        </ListHeader>
        <ListHeader>
          <span>Ações</span>
        </ListHeader>

        {deliverymans.map((deliveryman) => (
          <>
            <ListMain key={deliveryman.id}>
              <span>#{deliveryman.id}</span>
            </ListMain>
            <ListMain>

              <AvatarIcon
                size={40}
                round
                id={deliveryman.avatar !== null ? deliveryman.avatar.id : null}
                 src={deliveryman.avatar !== null ? deliveryman.avatar.url : blankAvatar}
              />

              {/* <AvatarIcon size={36} round name={deliveryman.name} /> */}
            </ListMain>
            <ListMain>
              <DeliveryManName>{deliveryman.name}</DeliveryManName>
            </ListMain>
            <ListMain>
              <span>{deliveryman.email}</span>
            </ListMain>
            <ListActions>
              <DropdownMenu inDeliverymans editData={deliveryman} deliveryman={deliveryman} />
            </ListActions>
          </>
        ))}
      </List>
      <Pagination>
          <Button
            disabled={(page <= 1 || searching) && true}
            value="prev"
            type="button"
            onClick={e => this.handlePagination(e, page - 1)}
          >
            <GoChevronLeft color="#FFF" size={20} />
            <p>Anterior</p>
          </Button>
          <span>{searching ? <FaSpinner /> : `Página ${page}`}</span>
          <Button
            value="next"
            type="button"
            disabled={(issues.length < perPage || searching) && true}
            onClick={e => this.handlePagination(e, page + 1)}
          >
            <p>Próxima</p>
            <GoChevronRight color="#FFF" size={20} />
          </Button>
        </Pagination>
    </>
  );
}
