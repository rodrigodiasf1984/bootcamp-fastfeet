import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 25px;
`;

export const DeliveryInfo = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;
export const DeliveryId = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  color: #7d40e7;
`;

export const Status = styled.View`
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
`;
export const StatusWithdrawn = styled.Text`
  color: #999999;
  font-size: 10px;
`;
export const StatusWaiting = styled.Text`
  color: #999999;
  font-size: 10px;
`;
export const StatusDelivered = styled.Text`
  color: #999999;
  font-size: 10px;
`;
export const Datas = styled.View`
  flex-direction: column;
  margin-top: 10px;
  padding: 10px;
  justify-content: space-between;
  background: #f8f9fd;
`;

export const DateHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DateHeaderValues = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderDateTitle = styled.Text`
  color: #999999;
  font-size: 10px;
`;
export const HeaderCity = styled.Text`
  margin-left: -45px;
  color: #999999;
  font-size: 10px;
`;
export const Date = styled.Text`
  font-weight: bold;
`;
export const City = styled.Text`
  font-weight: bold;
`;

export const Details = styled.TouchableOpacity``;
export const DetailsText = styled.Text`
  font-weight: bold;
  color: #7d40e7;
  font-size: 14px;
`;
