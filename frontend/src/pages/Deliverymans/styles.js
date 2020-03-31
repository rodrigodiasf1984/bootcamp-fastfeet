import styled from 'styled-components';
import Avatar from 'react-avatar';
import { darken } from 'polished';

export const List = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

export const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  justify-content: space-between;
`;

export const SubmitButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  width: 160px;
  padding: 0 16px;
  background: #7159c1;
  border: 1px solid #ddd;
  border-radius: 4px;

  svg {
    margin-right: 8px;
  }

  strong {
    color: #fff;
    display: flex;
  }

  &:hover {
    background: ${darken(0.03, '#7159c1')};
  }
`;

export const AvatarIcon = styled(Avatar).attrs({
  // color: '#F4EFFC',
  maxInitials: 2,
  // fgColor: 'black',
})`
  display: flex;
  justify-content: center;
  span {
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
`;

export const Title = styled.div`
  margin: 10px;
`;
