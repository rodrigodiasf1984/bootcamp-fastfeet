import React, { useState } from 'react';
import Background from '~/components/Background';
import { Container, SubmitButton, Form, InputText } from './styles';
import api from '~/services/api';
import * as Toast from '~/components/Toast';
import PropTypes from 'prop-types';

export default function DeliveryProblem({ route, navigation }) {
  const [textInput, setTextInput] = useState('');
  const id = route.params;

  async function handleProblem() {
    try {
      const response = await api.post(`/delivery/${id}/problems`, {
        description: textInput
      });
      Toast.successIcon('Problema cadastrado');
      navigation.goBack();
    } catch (error) {
      Toast.error(response.data.error);
      //console.tron.log(error, 'P2');
    }
  }

  return (
    <>
      <Background />
      <Container>
        <Form>
          <InputText
            placeholder={'Inclua aqui o problema que ocorreu na entrega'}
            multiline={true}
            value={textInput}
            onChangeText={setTextInput}
          />
        </Form>
        <SubmitButton onPress={handleProblem}>Enviar</SubmitButton>
      </Container>
    </>
  );
}

DeliveryProblem.propTypes = {
  navigation: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};
