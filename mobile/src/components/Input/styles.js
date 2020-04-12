import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background:#DDDDDD;
  flex-direction: row;
  align-items: center;

`;
export const TextInput=styled.TextInput.attrs({
  placeholderTextColor:'#999999',
})`
  flex:1;
  font-size:15px;
  margin-left:10px;
  color:#fff;
`;
