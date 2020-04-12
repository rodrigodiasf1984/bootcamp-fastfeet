import React from 'react';
import Background  from '~/components/Background';
import { Container, Form, FormInput, SubmitButton, Logo } from './styles';
import logo from '~/assets/logo.png';

export default function SignIn({navigation}) {

  function handleSubmit(){

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
            />
        {/* <SubmitButton onPress={()=>navigation.navigate('Dashboard') }>Entrar no sistema</SubmitButton> */}
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
       </Form>
      </Container>
    </Background>
  );
}

