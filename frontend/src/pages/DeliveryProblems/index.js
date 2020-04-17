import React, { useState, useEffect } from 'react';
import {
  List,
  ListHeader,
  ListMain,
  ListActions,
  Title,
  Pagination,
  Description,
  Container,
} from './styles';

import DropdownMenu from '~/components/DropdownMenu';
import api from '~/services/api';
import Modal from '~/components/DeliveryProblemModal';
import { toast } from 'react-toastify';
import Button from '~/components/Button';
import { FaSpinner } from 'react-icons/fa';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import SearchInput from '~/components/SearchInput';
import formatString from '~/utils/formatString';
import PropTypes from 'prop-types';

export default function DeliveryProblems() {
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  async function searchDeliveryProblems() {
    setLoading(true);
    const response = await api.get('delivery/problems', {
      params: {
        page,
        q: searchInput,
      },
    });

    setDeliveryProblems(response.data);
    setLoading(false);
    setSearchInput('');
  }
  useEffect(() => {
    searchDeliveryProblems();
  }, [page]);

  function handleRequestClose() {
    setModalIsOpen(false);
  }

  async function handleCancelDelivery(cancelDelivery) {
    //console.tron.log(cancelDelivery, 'apagar');
    await api.delete(`/problem/${cancelDelivery.delivery.id}/cancel-delivery`)
      .then(() => {
        toast.success('Encomenda cancelada com sucesso!');
        searchDeliveryProblems();
      })
      .catch((err) => {
        //console.tron.log(err.response);
        toast.error(err.response.data.error);
      });
  }

  function handleRequestOpen(deliveryProblem) {
    //console.tron.log(deliveryProblem.description, 'tttttttttt');
    setModalData(deliveryProblem.description);
    setModalIsOpen(true);
  }

  function handlePrevPage() {
    setPage(page - 1);
  };

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  function handlePressEnter(e) {
    e.preventDefault();
    if (e.keyCode === 13 || e.wich === 13) {
      setDeliveryProblems();
    }
  }

  return (
    <Container>
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
      <SearchInput
        placeholder="Buscar encomendas"
        loading={loading}
        value={searchInput}
        onChange={handleSearchInput}
        onKeyUp={handlePressEnter}
      />
      <List>
        <ListHeader>
          <span>Encomenda</span>
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
              <Description>{formatString(deliveryProblem.description, 100)}</Description>
            </ListMain>
            <ListActions>
              <DropdownMenu inProblems deliveryProblem={deliveryProblem} openModalProblemFunction={handleRequestOpen} handleDelete={handleCancelDelivery} />
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
          disabled={(deliveryProblems.length < perPage || loading) && true}
          onClick={handleNextPage}
        >
          <strong>PRÓXIMA</strong>
          <GoChevronRight color="#FFF" size={20} />
        </Button>
      </Pagination>
    </Container>
  );
}

DeliveryProblems.propTypes = {
  navigation: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};
