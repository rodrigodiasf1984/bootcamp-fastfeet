import React, { useState } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
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
  // const [avatar_id, setAvatar_id]=useState([]);

  function handleInputName(e) {
    setNameInput(e.target.value);
  }
  function handleInputEmail(e) {
    setEmailInput(e.target.value);
  }
  // function handleAvatarId(){
  //   setAvatar_id(document.getElementById("avatar").dataset.file)
  // }

  const schema = Yup.object().shape({
    nameInput: Yup.string().required('O nome é obrigatório'),
    emailInput: Yup.string().email().required('O email é obrigatório'),

  });

  async function saveNewDeliveryman() {

     schema.validate({
      nameInput ,
      emailInput ,
    }, {abortEarly: false}).then(valid => {
      console.tron.log('valid:', valid)
    }).catch(err => {
      console.tron.log('err:', err.errors)
    })

    const avatar_id=document.getElementById("avatar").dataset.file;
    console.tron.log(nameInput, emailInput, avatar_id);
    await api
    .post('deliverymans', {
      name: nameInput,
      email: emailInput,
      avatar_id: avatar_id,
    })
    .then(() => {
      toast.success('Entregador cadastrado com sucesso!');
    })
    .catch((err) => {
      console.tron.log(err.response);
      toast.error(err.response.data.error);
    });

  }
  return (
    <>
      <Title>
        <header>
          <h1>Cadastro de entregadores</h1>
        </header>
      </Title>
      <Form  schema={schema} onSubmit={saveNewDeliveryman}>
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

