import React, { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
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
  const [productInput, setProductInput] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [currentRecipients, setCurrentRecipients] = useState(null);
  const [currentDeliveryman, setCurrentDeliverymans] = useState(null);
  const [deliverymans, setDeliverymans] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState({});
  const [selectDeliveryman, setSelectedDeliveryman] = useState({});

  const delivery= useSelector(state=>state.delivery.data);

  useEffect(() => {
    async function loadData() {
      if(delivery){
        setProductInput(delivery.product);
        console.tron.log(delivery)
        const currentRecipients={
          label:delivery.recipient.name,
          value:delivery.recipient.id,
        }
        setCurrentRecipients(currentRecipients);

        const currentDeliveryman ={
          label: delivery.deliveryman.name,
          value: delivery.deliveryman.id,
        }
        setCurrentDeliverymans(currentDeliveryman);
      }
      const responseRecipients = await api.get('recipients');
      const responseDeliveryMans = await api.get('deliverymans');

      setRecipients(
        responseRecipients.data.map((recipient) => ({
          label: recipient.name,
          value: recipient.id,
        }))
      );

      setDeliverymans(
        responseDeliveryMans.data.map((deliveryman) => ({
          label: deliveryman.name,
          value: deliveryman.id,
        }))
      );
    }
      loadData();
    }, []);

    // console.log(currentRecipients, 'Recipients');
    // console.log(currentDeliveryman, 'Deliverymans')

  async function searchDeliverymans(inputValue, callback) {
    const response = await api.get('deliverymans', {
      params: {
        q: inputValue,
      },
    });

    const filterDeliveryman = response.data.map((deliveryman) => ({
      label: deliveryman.name,
      value: deliveryman.id,
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
      label: recipient.name,
      value: recipient.id,
    }));

    callback(filterRecipient);
  }

  function handleInputproduct(e) {
    setProductInput(e.target.value);
  }

  function handleChangeRecipient(selectedOption){
    setCurrentRecipients(selectedOption.id);
  };

  function handleChangeDeliveryman(selectedOption){
    setCurrentDeliverymans(selectedOption.id);
  };

  // const schema = Yup.object().shape({
  //   productInput: Yup.string().required('O produto é obrigatório'),
  //   recipient_id: Yup.object().required('O destinatário é obrigatório'),
  //   deliveryman_id: Yup.object().required('O entregador é obrigatório'),
  // });

  async function saveNewDelivery() {

    // schema.validate({
    //   product:productInput,
    //   recipient_id:selectedRecipient.id,
    //   deliveryman_id:selectDeliveryman.id,
    // }, {abortEarly: false}).then(valid => {
    //   console.tron.log('valid:', valid)
    // }).catch(err => {
    //   console.tron.log('err:', err.errors)
    //   err.errors.forEach(error => {
    //     toast.error(error);
    //   });
    // })

      if(delivery){
        await api.put(`/deliveries/${delivery.id}`,{
          product:productInput,
          recipient_id:selectedRecipient.id,
          deliveryman_id:selectDeliveryman.id,
        })
        .then(()=>{
          toast.success('Encomenda atualizada com sucesso!');
        })
        .catch((err)=>{
          console.tron.log(err.response);
          toast.error(err.response);
        });
      }

      await api
        .post('deliveries', {
          product: productInput,
          recipient_id: selectedRecipient.id,
          deliveryman_id: selectDeliveryman.id,
        })
        .then(() => {
          toast.success('Encomenda cadastrada com sucesso!');
        })
        .catch((err) => {
          console.tron.log(err.response);
          toast.error(err.response);
        });
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
      <Form>
      <Container>
          {/* <Link to="/Deliveries"> */}
            <Button background="#CCCCCC" onClick={handleBack}>
              <MdKeyboardArrowLeft color="#fff" size={25} />
              <strong>VOLTAR</strong>
            </Button>
          {/* </Link> */}
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
              onChange={{handleChangeRecipient}}
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
              onChange={{handleChangeDeliveryman}}
              isSearchable
              loadOptions={searchDeliverymans}
              noOptionsMessage={() => 'Entregador não encontrado!'}
              onChage={setDeliverymans}
              />
          </ContentItem>
          <ContentProduct>
            <strong>Nome do produto</strong>
            <DefaultInput
            value={productInput}
              name="productInput"
              type="text"
              value={productInput}
              onChange={handleInputproduct}
              placeholder="Digite o nome da encomenda"
              />
          </ContentProduct>
        </ContentForm>
      </Form>
    </>
  );
}
