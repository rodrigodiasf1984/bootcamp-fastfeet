import React, { useState, useEffect } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import {
  Container,
  Title,
  ContentForm,
  ContentItem,
  ContentProduct,
} from './styles';

import Button from '~/components/Button';
import DefaultInput from '~/components/DefaultInput';
import api from '~/services/api';

export default function RegisterDelivery() {
  const [productInput, setProductInput] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState([]);
  const [selectDeliveryman, setSelectedDeliveryman] = useState([]);

  useEffect(() => {
    async function loadData() {
      const responseRecipients = await api.get('recipients');
      const responseDeliveryMans = await api.get('deliverymans');

      setRecipients(
        responseRecipients.data.map((recipient) => ({
          id: recipient.id,
          label: recipient.name,
          value: recipient.name.toUpperCase(),
        }))
      );

      setDeliverymans(
        responseDeliveryMans.data.map((deliveryman) => ({
          id: deliveryman.id,
          label: deliveryman.name,
          value: deliveryman.name.toUpperCase(),
        }))
      );
    }
    loadData();
  }, []);

  async function searchDeliverymans(inputValue, callback) {
    const response = await api.get('deliverymans', {
      params: {
        q: inputValue,
      },
    });
    const filterDeliveryman = response.data.map((deliveryman) => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    callback(filterDeliveryman);
  }

  async function searchRecipient(inputValue, callback) {
    const response = await api.get('recipients', {
      params: {
        q: inputValue,
      },
    });

    const filterRecipient = response.data.map((recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));

    callback(filterRecipient);
  }

  function handleInputproduct(e) {
    setProductInput(e.target.value);
  }

  async function saveNewDelivery() {
    try {
      // const recipient_id = selectedRecipient.id;
      // const deliveryman_id = selectDeliveryman.id;

      // console.tron.log(recipient_id, deliveryman_id, productInput);
      // const schema = Yup.object().shape({
      //   deliveryman_id: Yup.string().required('O entregador é obrigatório'),
      //   recipient_id: Yup.string().required('O destinatário é obrigatório'),
      //   productInput: Yup.string().required('O nome do produto é obrigatório'),
      // });
      // console.log(schema);
      // if (!(await schema.isValid())) {
      //   return toast.error('Validation fails');
      // }

      await api.put(`/deliveries`, {
        product: productInput,
        recipient_id: selectedRecipient.id,
        deliveryman_id: selectDeliveryman.id,
      });

      return toast.sucess('Encomenda criada com sucesso!');
    } catch (error) {
      return toast.error('Erro ao cadastrar a encomenda');
    }
  }

  return (
    <>
      <Title>
        <header>
          <h1>Cadastro de encomendas</h1>
        </header>
      </Title>
      <Container>
        <Link to="/Deliveries">
          <Button background="#CCCCCC">
            <MdKeyboardArrowLeft color="#fff" size={25} />
            <strong>VOLTAR</strong>
          </Button>
        </Link>
        <Button background="#7159c1" onClick={saveNewDelivery}>
          <MdDone color="#fff" size={25} />
          <strong>SALVAR</strong>
        </Button>
      </Container>
      <ContentForm>
        <ContentItem>
          <strong>Destinatário</strong>
          <AsyncSelect
            defaultOptions={recipients}
            onChange={setSelectedRecipient}
            placeholder="Selecione o destinatário"
            isSearchable
            loadOptions={searchRecipient}
            noOptionsMessage={() => 'Destinatário não encontrado'}
          />
        </ContentItem>
        <ContentItem>
          <strong>Entregador</strong>
          <AsyncSelect
            defaultOptions={deliverymans}
            placeholder="Selecione o Entregador"
            onChange={setSelectedDeliveryman}
            isSearchable
            loadOptions={searchDeliverymans}
            noOptionsMessage={() => 'Entregador não encontrado!'}
            onChage={setDeliverymans}
          />
        </ContentItem>
        <ContentProduct>
          <strong>Nome do produto</strong>
          <DefaultInput
            name="productInput"
            type="text"
            value={productInput}
            onChange={handleInputproduct}
            placeholder="Digite o nome da encomenda"
          />
        </ContentProduct>
      </ContentForm>
    </>
  );
}
