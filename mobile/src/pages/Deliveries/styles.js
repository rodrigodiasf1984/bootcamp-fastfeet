import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;
export const Header = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 20px;
`;

export const Avatar = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
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

export const Deliveryman = styled.View`
  padding: 20px;
`;
export const Greetings = styled.Text`
  color: #666666;
`;

export const DeliverymanName = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

export const Logout = styled.TouchableOpacity`
  padding: 10px;
  margin-left: 90px;
`;

export const DeliveryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const DeliveriesActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: -30px;
`;
export const Actions = styled.View`
  flex-direction: row;
`;

export const ButtonFilter = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const ButtonFilterText = styled.Text`
  color: ${(props) => (props.isActive ? '#7D40E7' : '#999999')};
  /* color:#7D40E7; */
  text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
  font-weight: bold;
`;
export const TitleDeliveries = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

export const Details = styled.TouchableOpacity``;
export const DetailsText = styled.Text`
  font-weight: bold;
  color: #7d40e7;
  font-size: 14px;
`;

export const Image = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;

export const EmptyList = styled.View`
  align-self: center;
  padding: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const InfoList = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: bold;
`;
