import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
`;
export const List = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  min-width: 400px;
`;

export const ListHeader = styled.div`
  padding: 10px;
  background: #7159c1;

  span {
    color: #fff;
    font-size: 20px;
  }
  &:last-of-type {
    text-align: right;
    border-top-right-radius: 5px;
  }

  &:first-of-type {
    border-top-left-radius: 5px;
  }

  height: auto;
  font-weight: bold;
`;

export const DeliveryManName = styled.span`
  margin-left: 10px;
`;

export const ListMain = styled.main`
  border-radius: 4px;
  padding: 10px;
  background: #ffffff;
  height: 57px;
  display: flex;

  span {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    align-self: center;
  }
`;

export const ListActions = styled.main`
  display: flex;
  border-radius: 4px;
  padding: 10px;
  align-content: center;
  background: #ffffff;
  justify-content: flex-end;
  height: 57px;
`;

export const Title = styled.div`
  margin: 10px;
`;

export const Pagination = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  min-width: 400px;
  bottom: 0;

  button {
    margin-right: 10px;
  }
  span {
    font-size: 20px;
  }
`;

export const Description = styled.span.attrs({})`
  justify-content: flex-start;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
`;
