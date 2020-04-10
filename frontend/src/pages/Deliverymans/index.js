import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import {
  Container,
  DeliveryManName,
  List,
  ListHeader,
  ListMain,
  ListActions,
  Title,
  AvatarIcon,
  Pagination,
} from './styles';
import SearchInput from '~/components/SearchInput';
import DropdownMenu from '~/components/DropdownMenu';
import Button from '~/components/Button';
import api from '~/services/api';
import blankAvatar from '~/assets/blank-profile-picture.webp';
import { toast } from 'react-toastify';
import history from '~/services/history';

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  async function searchDeliverymans() {
    setLoading(true);
    const response = await api.get('deliverymans', {
      params: {
        page,
        q: searchInput,
      },
    });

    setDeliverymans(response.data);
    setLoading(false);
    setSearchInput('');
  }
  useEffect(() => {
    searchDeliverymans();
  }, [page]);

  function handlePrevPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  function handlePressEnter(e) {
    e.preventDefault();
    if (e.keyCode === 13 || e.wich === 13) {
      searchDeliverymans();
    }
  }

  async function handleDeleteDeliveryman(deleteDeliveryman){
    //console.tron.log(deleteDeliveryman, 'apagar');
    await api.delete(`/deliverymans/${deleteDeliveryman.id}`)
    .then(()=>{
      toast.success('Entregador apagado com sucesso!');
    })
    .catch((err)=>{
      console.tron.log(err.response);
      toast.error(err.response.data.error);
    });
    searchDeliverymans();
  }

  return (
    <>
      <Title>
        <header>
          <h1>Gerenciando entregadores</h1>
        </header>
      </Title>
      <Container>
        <SearchInput
          placeholder="Buscar entregadores"
          loading={loading}
          value={searchInput}
          onChange={handleSearchInput}
          onKeyUp={handlePressEnter}
        />
        <Link to="/RegisterDeliverymans">
          <Button background="#7159c1">
            <MdAdd color="#fff" size={25} />
            <strong>CADASTRAR</strong>
          </Button>
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
                src={
                  deliveryman.avatar !== null
                    ? deliveryman.avatar.url
                    : blankAvatar
                }
              />
            </ListMain>
            <ListMain>
              <DeliveryManName>{deliveryman.name}</DeliveryManName>
            </ListMain>
            <ListMain>
              <span>{deliveryman.email}</span>
            </ListMain>
            <ListActions>
              <DropdownMenu
                inDeliverymans
                editData={deliveryman}
                deliveryman={deliveryman}
                handleDelete={handleDeleteDeliveryman}
              />
            </ListActions>
          </>
        ))}
      </List>
      <Pagination>
        <Button
          background="#7159c1"
          disabled={page === 1}
          value="prev"
          onClick={handlePrevPage}
        >
          <GoChevronLeft color="#FFF" size={20} />
          <strong>ANTERIOR</strong>
        </Button>
        <span>{loading ? <FaSpinner /> : `Página ${page}`}</span>
        <Button
          background="#7159c1"
          value="next"
          disabled={(deliverymans.length < perPage || loading) && true}
          onClick={handleNextPage}
        >
          <strong>PRÓXIMA</strong>
          <GoChevronRight color="#FFF" size={20} />
        </Button>
      </Pagination>
    </>
  );
}
