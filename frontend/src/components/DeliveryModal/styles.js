import styled from 'styled-components';
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    & + div {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #eeeeee;
    }
    img {
        width: auto;
        max-height: 100px;
    }
`;

export const ProductName=styled.text`
  display:flex;
  flex-direction:column;
  margin-top:5px;
  margin-bottom:5px;

`;
export const Address=styled.div`
  display:flex;
  flex-direction:column;
  margin-top:5px;
  margin-bottom:5px;

`;
export const DateTitle=styled.div`
  display:flex;
  flex-direction:column;
  margin-top:5px;
  margin-bottom:5px;
`;
