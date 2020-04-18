import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity, Text, View } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 20px;
`;

export const Content = styled.View`
  margin-top: -100px;
  height: 450px;
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

export const CameraContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  background-color: black;
`;

export const StyledCamera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const CaptureContainer = styled(View)`
  flex: 0;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;
`;

export const CameraCapButton = styled(TouchableOpacity)`
  margin-top: -40px;
  background: #0000004d;
  height: 85px;
  width: 85px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export const CameraCapButtonText = styled(Text)`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
`;
