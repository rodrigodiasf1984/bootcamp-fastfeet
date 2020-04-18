import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, FormInput, SubmitButton, Logo } from './styles';
import logo from '~/assets/logo.png';
import { signInRequest } from '~/store/modules/auth/actions';
import * as Toast from '~/components/Toast/index';

export default function SignIn() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');

  // const loading=useSelector(state=>state.auth.loading);

  function handleSubmit() {
    Toast.loading(true);
    if (id > 0) {
      dispatch(signInRequest(id));
    } else {
      Toast.error('O ID tem que ser maior que 0, o mesmo é Obrigatório');
    }
    Toast.loading(false);
  }
  return (
    <Container>
      <Logo source={logo} size={150} />
      <Form>
        <FormInput
          placeholder="Inform seu ID de cadastro"
          autoCorrect={false}
          keyboardType="numeric"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
