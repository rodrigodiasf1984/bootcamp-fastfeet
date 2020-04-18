import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import { Container, SubmitButton, Form, InputText } from './styles';
import api from '~/services/api';
import * as Toast from '~/components/Toast';

export default function DeliveryProblem({ route, navigation }) {
  const [textInput, setTextInput] = useState('');
  const id = route.params;

  async function handleProblem() {
    try {
      await api.post(`/delivery/${id}/problems`, {
        description: textInput,
      });
      Toast.successIcon('Problema cadastrado');
      navigation.goBack();
    } catch (error) {
      Toast.error(error.response.data.error);
    }
  }

  return (
    <>
      <Background />
      <Container>
        <Form>
          <InputText
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            multiline
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
