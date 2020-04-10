import styled from 'styled-components';
import Avatar from 'react-avatar';
import { darken } from 'polished';

export const List = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

const handleStatusColor = (status) => {
  switch (status) {
    case 'ENTREGUE':
      return '#DFF0DF';
    case 'PENDENTE':
      return '#F0F0DF';
    case 'RETIRADA':
      return '#BAD2FF';
    case 'CANCELADA':
      return '#FAB0B0';
    default:
      return null;
  }
};

const handleStatusTextColor = (status) => {
  switch (status) {
    case 'ENTREGUE':
      return '#2CA42B';
    case 'PENDENTE':
      return '#C1BC35';
    case 'RETIRADA':
      return '#4D85EE';
    case 'CANCELADA':
      return '#DE3B3B';
    default:
      return null;
  }
};

export const DeliveryStatus = styled.span`
  background: ${(props) => handleStatusColor(props.status)};
  /* background: #DFF0DF; */
  font-weight: bold;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 14px;
  display: inline-block;
  font-weight: bold;
  color: ${(props) => handleStatusTextColor(props.status)};

  &::before {
    content: '';
    margin-top: 3px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 6px;
    background: ${(props) => handleStatusTextColor(props.status)};
  }
`;

export const Title = styled.div`
  margin: 10px;
`;

export const Pagination = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: row;
  margin-top:25px;
  margin-bottom:5px;
  height:auto;
  justify-content: space-between;
  align-items:center;
  align-content:center;
  min-width: 400px;

  button{
    margin-right:10px;
  }

  span{
    font-size: 20px;
  }

`;
