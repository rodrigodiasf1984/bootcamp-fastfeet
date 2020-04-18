import styled from 'styled-components/native';

export const CredentialsContainer = styled.View`
  width: ${(props) => `${props.size}px`};
  /* width:80px; */
  /* height:80px; */
  height: ${(props) => `${props.size}px`};

  border-radius: ${(props) => `${props.size / 2}px`};
  align-self: center;
  background: #f4effc;
  align-items: center;
  justify-content: center;
  border: 3px solid #eee;
`;

export const Letters = styled.Text`
  color: #a28fd9;
  font-size: 36px;
`;
