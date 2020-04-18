import React from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
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
import history from '~/services/history';
import { clearDeliveryman } from '~/store/modules/deliveryman/actions';

export default function RegisterDeliverymans() {
  const deliveryman = useSelector((state) => state.deliveryman.data);


  const schema = Yup.object().shape({
    avatar_id: Yup.number(),
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().email().required('O email é obrigatório'),
  });

  async function saveNewDeliveryman({ avatar_id, name, email }) {
    if (deliveryman) {
      await api
        .put(`/deliverymans/${deliveryman.id}`, {
          avatar_id,
          name,
          email,
        })
        .then(() => {
          toast.success('Entregador atualizado com sucesso!');
          history.push('/deliverymans');
        })
        .catch((err) => {
          console.tron.log(err.response);
          toast.error(err.response.data.error);
        });
    } else {
      await api
        .post('deliverymans', {
          avatar_id,
          name,
          email,
        })
        .then(() => {
          toast.success('Entregador cadastrado com sucesso!');
          history.push('/deliverymans');
        })
        .catch((err) => {
          console.tron.log(err.response);
          toast.error(err.response.data.error);
        });
    }
  }

  const dispatch = useDispatch();
  function handleBack() {
    dispatch(clearDeliveryman());
    history.push('/deliverymans');
  }

  return (
    <>
      <Title>
        <header>
          {deliveryman === null ? (
            <h1>Cadastro do entregador</h1>
          ) : (
            <h1>Edição do entregador</h1>
          )}
        </header>
      </Title>
      <Form
        initialData={deliveryman}
        schema={schema}
        onSubmit={saveNewDeliveryman}
      >
        <Container>
          <Button background="#CCCCCC" onClick={handleBack}>
            <MdKeyboardArrowLeft color="#fff" size={25} />
            <strong>VOLTAR</strong>
          </Button>
          <Button background="#7159c1">
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
                name="name"
                type="text"
                placeholder="Digite o nome do entregador"
              />
            </ContentInput>
          </ContentItem>
          <ContentItem>
            <strong>Email</strong>
            <ContentInput>
              <DefaultInput
                name="email"
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
