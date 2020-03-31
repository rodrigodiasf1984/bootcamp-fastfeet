import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import {
  Container,
  Title,
  ContentForm,
  ContentItem,
  ContentInput,
} from './styles';

import Button from '~/components/Button';
import DefaultInput from '~/components/DefaultInput';
import api from '~/services/api';
import AvatarInput from '../AvatarInput';

export default function RegisterDeliverymans() {
  const [nameInput, setNameInput] = useState([]);
  const [emailInput, setEmailInput] = useState([]);

  function handleInputName(e) {
    setNameInput(e.target.value);
  }
  function handleInputEmail(e) {
    setEmailInput(e.target.value);
  }

  async function saveNewDeliveryman() {
    // const recipient_id = selectedRecipient.id;
    // const deliveryman_id = selectDeliveryman.id;

    // const schema = Yup.object().shape({
    //   deliveryman_id: Yup.string().required('O entregador é obrigatório'),
    //   recipient_id: Yup.string().required('O destinatário é obrigatório'),
    //   productInput: Yup.string().required('O nome do produto é obrigatório'),
    // });

    // if (!(await schema.isValid(productInput, recipient_id, deliveryman_id))) {
    //   toast.error('Validation fails');
    // }
    const response = await api.get('deliverymans', {
      params: {
        q: nameInput,
      },
    });
    console.tron.log(response.data);
    if (!response.data || response.data === undefined) {
      await api
        .post('deliverymans', {
          name: nameInput,
          email: emailInput,
          avatar_id: '',
        })
        .then(() => {
          toast.success('Entragador cadastrado com sucesso!');
        })
        .catch((err) => {
          console.tron.log(err.response);
        });
    } else {
      toast.error('Já existe um entregador com esse nome');
    }
  }

  return (
    <>
      <Title>
        <header>
          <h1>Cadastro de entregadores</h1>
        </header>
      </Title>
      <Form onSubmit={saveNewDeliveryman}>
        <Container>
          <Link to="/Deliverymans">
            <Button background="#CCCCCC">
              <MdKeyboardArrowLeft color="#fff" size={25} />
              <strong>VOLTAR</strong>
            </Button>
          </Link>
          <Button background="#7159c1" onClick={saveNewDeliveryman}>
            <MdDone color="#fff" size={25} />
            <strong>SALVAR</strong>
          </Button>
        </Container>

        <ContentForm>
          <div>
            <AvatarInput name="avatar_id" />
          </div>
          <ContentItem>
            <strong>Nome</strong>
            <ContentInput>
              <DefaultInput
                name="deliveymanName"
                type="text"
                placeholder="Digite o nome do entregador"
                value={nameInput}
                onChange={handleInputName}
              />
            </ContentInput>
          </ContentItem>
          <ContentItem>
            <strong>Email</strong>
            <ContentInput>
              <DefaultInput
                name="deliveymanEmail"
                type="email"
                placeholder="Digite o e-mail do entregador"
                value={emailInput}
                onChange={handleInputEmail}
              />
            </ContentInput>
          </ContentItem>
        </ContentForm>
      </Form>
    </>
  );
}
