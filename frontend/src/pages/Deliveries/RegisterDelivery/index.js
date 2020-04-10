import React, { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import AsyncSelect from './AsynSelect';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';

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
import history from '~/services/history';
import {clearDelivery} from '~/store/modules/delivery/actions';
import {useDispatch} from 'react-redux';

export default function RegisterDelivery() {
  //const [productInput, setProductInput] = useState('');
  const delivery= useSelector(state=>state.delivery.data);

  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);
  const[currentRecipient, setCurrentRecipient]=useState(delivery && delivery.recipient.name);
  const[currentDeliveryman,setCurrentDeliveryman]=useState(delivery && delivery.deliveryman.name);
  const[product, setProduct]=useState(delivery  && delivery.product);

  useEffect(()=>{

    async function loadRecipients(inputValue) {
      const response = await api.get('recipients', {
        params: {
          q: inputValue,
        },
      });

      const filterRecipient = response.data.map((recipient) => ({
        label: recipient.name,
        value: recipient.id,
      }));

      setRecipients(filterRecipient);
    }

  async function loadDeliverymans(inputValue) {
    const response = await api.get('deliverymans', {
      params: {
        q: inputValue,
      },
    });

    const filterDeliveryman = response.data.map((deliveryman) => ({
      label: deliveryman.name,
      value: deliveryman.id,
    }));

    setDeliverymans(filterDeliveryman);
  }
  loadRecipients();
  loadDeliverymans();
}, []);

  const handleRecipientChange = (value) => {
    setCurrentRecipient(value);
  }

  const handleDeliveryman = (value)=>{
    setCurrentDeliveryman(value);
  }

  const filterData = (inputValue, array) => {
    return array.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const recipientOptions = (inputValue) =>
    new Promise((resolve) => {
      resolve(filterData(inputValue, recipients));
    });

  const deliverymanOptions = (inputValue) =>
    new Promise((resolve) => {
      resolve(filterData(inputValue, deliverymans));
    });

    const schema = Yup.object().shape({
      recipient: Yup.object({
        value: Yup.number(),
        label: Yup.string(),
      }).required('O destinatário é obrigatório'),
      deliveryman: Yup.object({
        value: Yup.number(),
        label: Yup.string(),
      }).required('O entregador é obrigatório'),
      product: Yup.string().required('O produto é obrigatório'),
    });

  async function saveNewDelivery(data) {

      if(delivery){
        await api.put(`/deliveries/${delivery.id}`,{
          product:data.product,
          recipient_id:data.recipient.value,
          deliveryman_id:data.deliveryman.value,
        })
        .then(()=>{
          toast.success('Encomenda atualizada com sucesso!');
          handleBack();
        })
        .catch((err)=>{
          //console.tron.log(response);
          err.errors.forEach(error => {
            toast.error(err.response.data.error);
          });
          //toast.error('TESTE');
        });
      }else{
        await api
        .post('deliveries', {
          product:data.product,
          recipient_id:data.recipient.value,
          deliveryman_id:data.deliveryman.value,
        })
        .then(() => {
          toast.success('Encomenda cadastrada com sucesso!');
          handleBack();
        })
        .catch((err) => {
          console.tron.log(err.response.data.error);
          toast.error(err.response.data.error);
        });
      }
  }

  const dispatch = useDispatch();
  function handleBack(){
    dispatch(clearDelivery());
    history.push('/deliveries');
  }

  return (
    <>
      <Title>
        <header>
          {delivery === null ? <h1>Cadastro de encomendas</h1> : <h1>Edição da encomenda</h1>}
        </header>
      </Title>
      <Form initialData={delivery} schema={schema} onSubmit={saveNewDelivery}>
      <Container>
          {/* <Link to="/Deliveries"> */}
            <Button background="#CCCCCC" onClick={handleBack}>
              <MdKeyboardArrowLeft color="#fff" size={25} />
              <strong>VOLTAR</strong>
            </Button>
          {/* </Link> */}
          <Button background="#7159c1">
            <MdDone color="#fff" size={25} />
            <strong>SALVAR</strong>
          </Button>
        </Container>
        <ContentForm>
          <ContentItem>
            <strong>Destinatário</strong>
            <AsyncSelect
              name="recipient"
              cacheOptions
              inputValue={currentRecipient}
              onInputChange={handleRecipientChange}
              defaultOptions={recipients}
              loadOptions={recipientOptions}
              placeholder="Selecione o destinatário"
              isSearchable
              noOptionsMessage={() => 'Destinatário não encontrado'}
              />
          </ContentItem>
          <ContentItem>
            <strong>Entregador</strong>
            <AsyncSelect
              name="deliveryman"
              inputValue={currentDeliveryman}
              onInputChange={handleDeliveryman}
              cacheOptions
              defaultOptions={deliverymans}
              placeholder="Selecione o Entregador"
              isSearchable
              loadOptions={deliverymanOptions}
              noOptionsMessage={() => 'Entregador não encontrado!'}
              />
          </ContentItem>
          <ContentProduct>
            <strong>Nome do produto</strong>
            <DefaultInput
              name="product"
              type="text"
              placeholder="Digite o nome da encomenda"
              />
          </ContentProduct>
        </ContentForm>
      </Form>
    </>
  );
}
