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
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  align-items: center;
  justify-items: left;
  border-radius: 5px;
`;

export const ContentItems = styled.div`
  margin: 20px;
  font-weight: bold;
  width: 104%;
  display: flex;
  flex-direction: column;
`;

export const ContentName = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export const ContentStreet = styled.div`
  margin-top: 10px;
  width: 70%;
`;

export const ContentStreetNumber = styled.div`
  margin-top: 10px;
  margin-left: -21px;
  margin-right: 3px;
  width: 12%;
`;

export const ContentComplement = styled.div`
  margin-top: 10px;
  width: 15%;
`;

export const ContentCity = styled.div`
  margin-top: 10px;
  width: 44%;
`;

export const ContentUf = styled.div`
  margin-top: 10px;
  width: 30%;
`;

export const ContentPostalCode = styled.div`
  width: 22%;
  margin-top: 10px;
  margin-left: 2px;
  input {
    padding: 0 16px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    display: flex;
    width: 95%;
  }
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  width: 104%;
`;
