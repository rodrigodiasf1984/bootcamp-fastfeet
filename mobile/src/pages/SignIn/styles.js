import {Platform} from 'react-native';
import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled:Platform.OS === 'ios',
  behavior:'padding',
})`
  flex:1;
  justify-content:center;
  align-items: center;
  padding:0 30px;
`;

export const Logo=styled.Image`
  width: 244px;
  height: 48px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top:30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  border-radius:5px;

`;

export const SubmitButton = styled(Button)`
  margin-top:5px;
`;
