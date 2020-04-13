import React, {useState} from 'react';
import Background  from '~/components/Background';
import { Container, Form, FormInput, SubmitButton, Logo } from './styles';
import {useDispatch} from 'react-redux';
import logo from '~/assets/logo.png';
import {signInRequest} from '~/store/modules/auth/actions';

export default function SignIn({navigation}) {
  const dispatch=useDispatch();
  const [id, setId]=useState('');

  function handleSubmit(){
     dispatch(signInRequest(id));
  }

  return (
    <Background>
      <Container>
        <Logo source={logo} size={150}/>
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
        {/* <SubmitButton onPress={()=>navigation.navigate('Dashboard') }>Entrar no sistema</SubmitButton> */}
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
       </Form>
      </Container>
    </Background>
  );
}

