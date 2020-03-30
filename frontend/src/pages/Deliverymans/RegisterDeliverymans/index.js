import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import AvatarInput from './AvatarInput';

export default function RegisterDeliverymans() {
  const dispatch = useDispatch();
  function handlesubmit(data) {
    // dispatch(useDispatch(createDeliveryman(data)));
  }

  return (
    <>
      <Title>
        <header>
          <h1>Cadastro de entregadores</h1>
        </header>
      </Title>
      <Form onSubmit={handlesubmit}>
        <Container>
          <Link to="/Deliverymans">
            <Button background="#CCCCCC">
              <MdKeyboardArrowLeft color="#fff" size={25} />
              <strong>VOLTAR</strong>
            </Button>
          </Link>
          <Button background="#7159c1" onClick={handlesubmit}>
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
              />
            </ContentInput>
          </ContentItem>
        </ContentForm>
      </Form>
    </>
  );
}
