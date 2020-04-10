import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  Container,
  RecipientName,
  List,
  ListHeader,
  ListMain,
  ListActions,
  Title,
  Pagination
} from './styles';

import SearchInput from '~/components/SearchInput';
import DropdownMenu from '~/components/DropdownMenu';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { FaSpinner } from 'react-icons/fa';
import {GoChevronLeft,GoChevronRight} from 'react-icons/go';
import Button from '~/components/Button';

export default function Recipients() {
  const [recipients, setRecipient] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage]=useState(10);
  const [loading, setLoading]=useState(false);
  const [searchInput, setSearchInput]=useState('');

  async function searchRecipient() {
    const response = await api.get('recipients', {
      params: {
        page,
        q: searchInput,
      },
    });

    setRecipient(response.data);
    setLoading(false);
    setSearchInput('');
  }
  useEffect(() => {
    searchRecipient();
  }, [page]);

  async function handleDeleteRecipient(deleteRecipient){
    console.tron.log(deleteRecipient, 'apagar');
    await api.delete(`/recipients/${deleteRecipient.id}`)
    .then(()=>{
      toast.success('Destinatário apagado com sucesso!');
      setSearchInput('');
      searchRecipient();
    })
    .catch((err)=>{
      console.tron.log(err.response);
      toast.error(err.response);
    });
  }
  function handlePrevPage(){
    setPage(page - 1);
  };

  function handleNextPage(){
    setPage(page + 1);
  }

  function handleSearchInput(e){
    setSearchInput(e.target.value);
  }

  function handlePressEnter(e){
    e.preventDefault();
    if(e.keyCode===13 || e.wich===13){
      searchRecipient();
    }
  }
  return (
    <>
      <Title>
        <header>
          <h1>Gerenciamento de destinatários</h1>
        </header>
      </Title>
      <Container>
        <SearchInput
          placeholder="Buscar destinatários"
          loading={loading}
          value={searchInput}
          onChange={handleSearchInput}
          onKeyUp={handlePressEnter}
        />
        <Link to="/RegisterRecipients">
        <Button   background="#7159c1">
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
              <DropdownMenu inRecipients recipient={recipient} editData={recipient} handleDelete={handleDeleteRecipient}/>
            </ListActions>
          </>
        ))}
      </List>
      <Pagination>
          <Button
            background="#7159c1"
            disabled={page===1}
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
            disabled={(recipients.length < perPage || loading) && true}
            onClick={handleNextPage}
          >
            <strong>PRÓXIMA</strong>
            <GoChevronRight color="#FFF" size={20} />
          </Button>
        </Pagination>
    </>
  );
}
