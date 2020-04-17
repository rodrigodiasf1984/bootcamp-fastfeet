import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex:1;
  padding-top:40px;
  background:#fff;
`;

export const NameLabel=styled.Text`
  color:#666666;
`;
export const Name=styled.Text`
  color:#444444;
  font-size:22px;
  font-weight:bold;
  margin-bottom:10px;
`;
export const EmailLabel=styled.Text`
  color:#666666;
`;
export const Email=styled.Text`
  color:#444444;
  font-size:22px;
  font-weight:bold;
  margin-bottom:10px;
`;
export const DateLabel=styled.Text`
  color:#666666;
`;
export const RegisteredDate=styled.Text`
  color:#444444;
  font-size:22px;
  font-weight:bold;
`;

export const ButtonLogout=styled.TouchableOpacity`
  margin-top:20px;
  background:#E74040;
  color:#fff;
  text-align:center;
  height:46px;
  padding:10px;
  font-weight:bold;
  border-radius:5px;
  font-size:18px;
`;
export const Info=styled.View`
  padding:40px;
`;

export const Image=styled.Image`
  height:150px;
  width:150px;
  border-radius:75px;
  align-self:center;
`;

export const ButtonText= styled.Text`
  align-self:center;
  font-weight:bold;
  color:#fff;
  font-size:16px;
`;
