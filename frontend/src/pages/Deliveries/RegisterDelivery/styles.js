import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.div`
  margin: 10px;
`;

export const ContentForm = styled.div`
  background: #fff;
  min-width: 400px;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  align-items: center;
  justify-items: left;
  border-radius: 5px;
`;

export const ContentItem = styled.div`
  margin: 30px;
  font-weight: bold;
  width: 88%;

  &:first-of-type {
    width: 95%;
  }
`;

export const ContentProduct = styled.div`
  margin: 30px;
  font-weight: 30px;
  display: flex;
  flex-direction: column;
  width: 198%;
`;
