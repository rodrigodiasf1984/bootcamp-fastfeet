import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #fff;
  padding: 20px;
`;

export const Form = styled.View`
  border-radius: 5px;
  margin-top: -30px;
  height: 65%;
`;
export const SubmitButton = styled(Button)`
  margin-top: 20px;
  background: #7d40e7;
  color: #fff;
  text-align: center;
  height: 46px;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  font-size: 18px;
`;

export const InputText = styled.TextInput.attrs({
  textAlignVertical: 'top',
})`
  padding: 20px;
  height: 130%;
  margin-top: -50px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #eee;
  text-align: center;
`;
