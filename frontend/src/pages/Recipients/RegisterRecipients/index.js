import React, { useState, useEffect } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ReactInputMask from 'react-input-mask';

import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Title,
  ContentForm,
  ContentItems,
  ContentName,
  ContentStreet,
  ContentStreetNumber,
  ContentComplement,
  ContentCity,
  ContentUf,
  ContentPostalCode,
  Line,
} from './styles';

import Button from '~/components/Button';
import DefaultInput from '~/components/DefaultInput';
import api from '~/services/api';
import history from '~/services/history';
import { clearRecipient } from '~/store/modules/recipient/actions';

export default function RegisterRecipients() {
  const recipient = useSelector((state) => state.recipient.data);

  const [nameInput, setNameInput] = useState('');
  const [streetInput, setStreetInput] = useState('');
  const [streetNumberInput, setStreetNumberInput] = useState('');
  const [complementInput, setComplementInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [ufInput, setUfInput] = useState('');
  const [postalCodeInput, setPostalCodeInput] = useState('');

  useEffect(() => {
    async function loadData() {
      if (recipient) {
        setNameInput(recipient.name);
        setStreetInput(recipient.street);
        setStreetNumberInput(recipient.street_number);
        setComplementInput(recipient.complement ? recipient.complement : '');
        setCityInput(recipient.city);
        setUfInput(recipient.uf);
        setPostalCodeInput(recipient.postal_code);
      }
    }
    loadData();
  }, [recipient]);

  function handleNameInput(e) {
    setNameInput(e.target.value);
  }

  function handleInputStreet(e) {
    setStreetInput(e.target.value);
  }
  function handleStreetNumberInput(e) {
    setStreetNumberInput(e.target.value);
  }
  function handleInputComplement(e) {
    setComplementInput(e.target.value);
  }
  function handleInputCity(e) {
    setCityInput(e.target.value);
  }
  function handleInputUf(e) {
    setUfInput(e.target.value);
  }
  function handleInputPostalCode(e) {
    setPostalCodeInput(e.target.value);
  }

  const schema = Yup.object().shape({
    nameInput: Yup.string().required('O nome do destinatário é obrigatório'),
    streetInput: Yup.string().required('A rua é obrigatória'),
    streetNumberInput: Yup.string().required('Número da rua é obrigatório'),
    complementInput: Yup.string(),
    cityInput: Yup.string().required('A cidade é obrigatória'),
    ufInput: Yup.string()
      .test(
        'len',
        'A sigla precisa conter exatamente 2 letras',
        (val) => val.length === 2
      )
      .required('A sigla do estado é obrigatória'),
    postalCodeInput: Yup.string().required('O CEP é obrigatório'),
  });

  async function saveNewRecipient() {
    schema
      .validate(
        {
          nameInput,
          streetInput,
          streetNumberInput,
          complementInput,
          cityInput,
          ufInput,
          postalCodeInput,
        },
        { abortEarly: false }
      )
      .then((valid) => {
        console.tron.log('valid:', valid);
      })
      .catch((err) => {
        console.tron.log('err:', err.errors);
        err.errors.forEach((error) => {
          toast.error(error);
        });
      });

    if (recipient) {
      await api
        .put(`/recipients/${recipient.id}`, {
          name: nameInput,
          street: streetInput,
          street_number: streetNumberInput,
          complement: complementInput,
          city: cityInput,
          uf: ufInput,
          postal_code: postalCodeInput.replace(/\D/g, ''),
        })
        .then(() => {
          toast.success('Destinatário atualizado com sucesso!');
          history.push('/recipients');
        })
        .catch((err) => {
          console.tron.log(err.response);
          toast.error(err.response);
        });
    } else {
      await api
        .post('recipients', {
          name: nameInput,
          street: streetInput,
          street_number: streetNumberInput,
          complement: complementInput,
          city: cityInput,
          uf: ufInput,
          postal_code: postalCodeInput.replace(/\D/g, ''),
        })
        .then(() => {
          toast.success('Destinatário cadastrado com sucesso!');
          handleBack();
        })
        .catch((err) => {
          console.tron.log(err.response);
          toast.error(err.response);
        });
    }
  }

  const dispatch = useDispatch();
  function handleBack() {
    dispatch(clearRecipient());
    history.push('/recipients');
  }

  return (
    <>
      <Title>
        <header>
          {recipient === null ? (
            <h1>Cadastro do destinatário</h1>
          ) : (
            <h1>Edição do destinatário</h1>
          )}
        </header>
      </Title>
      <Container>
        {/* <Link to="/recipients"> */}
        <Button background="#CCCCCC" onClick={handleBack}>
          <MdKeyboardArrowLeft color="#fff" size={25} />
          <strong>VOLTAR</strong>
        </Button>
        {/* </Link> */}
        <Button background="#7159c1" onClick={saveNewRecipient}>
          <MdDone color="#fff" size={25} />
          <strong>SALVAR</strong>
        </Button>
      </Container>
      <ContentForm>
        <ContentItems>
          <Line>
            <ContentName>
              <strong>Nome</strong>
              <DefaultInput
                name="nameInput"
                type="text"
                value={nameInput}
                onChange={handleNameInput}
                placeholder="Digite o nome do destinatário"
              />
            </ContentName>
          </Line>
          <Line>
            <ContentStreet>
              <strong>Rua</strong>
              <DefaultInput
                name="streetInput"
                type="text"
                value={streetInput}
                onChange={handleInputStreet}
                placeholder="Digite a rua"
              />
            </ContentStreet>
            <ContentStreetNumber>
              <strong>Número</strong>
              <DefaultInput
                name="streetNumberInput"
                type="number"
                min="0"
                value={streetNumberInput}
                onChange={handleStreetNumberInput}
                placeholder="Número"
              />
            </ContentStreetNumber>
            <ContentComplement>
              <strong>Complemento</strong>
              <DefaultInput
                name="complementInput"
                type="text"
                value={complementInput}
                onChange={handleInputComplement}
              />
            </ContentComplement>
          </Line>
          <Line>
            <ContentCity>
              <strong>Cidade</strong>
              <DefaultInput
                name="cityInput"
                type="text"
                value={cityInput}
                onChange={handleInputCity}
                placeholder="Digite a cidade"
              />
            </ContentCity>
            <ContentUf>
              <strong>Estado</strong>
              <DefaultInput
                name="ufInput"
                type="text"
                value={ufInput}
                onChange={handleInputUf}
                placeholder="Digite a sigla do estado"
                maxlength="2"
                autocapitalize
              />
            </ContentUf>
            <ContentPostalCode>
              <strong>CEP</strong>
              <ReactInputMask
                mask="99.999-999"
                value={postalCodeInput}
                onChange={handleInputPostalCode}
              />
            </ContentPostalCode>
          </Line>
        </ContentItems>
      </ContentForm>
    </>
  );
}
