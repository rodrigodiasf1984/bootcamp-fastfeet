import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #fff;
  height: 85%;
`;

export const Content=styled.View`
  margin-top:-80px;
`;

export const DeliveryDetails=styled.View`
  flex-direction:column;
  background:#ffff;
  margin:20px;
  padding:10px;
  border-radius:5px;
  border: 1px solid #eeee;
`;

export const Status=styled.View`
  flex-direction:column;
  background:#ffff;
  margin:20px;
  padding:10px;
  margin-top: 0px;
  border-radius:5px;
  border: 1px solid #eeee;
`;

export const IconAndTitle= styled.View`
  flex-direction:row;
  align-content:center;
  align-items:center;
`;

export const InfoText=styled.Text`
  padding-left:5px;
  font-weight:bold;
  color: #7159c1;
`;

export const SubtitleLabel=styled.Text`
  color: #666666;
  font-size:14px;
`;

export const DateText=styled.Text`
  color: #666666;
  font-size:14px;
  margin-left:-50px;
`;

export const TitleLabel=styled.Text`
  padding-top:10px;
  color:#999999;
  font-weight:bold;
  font-size:14px;
`;

export const Dates=styled.View`
  flex-direction:row;
  align-content:center;
  align-items:center;
  justify-content:space-between;
`;

export const DateValues=styled.View`
  flex-direction:column;
  align-items:center;
`;

export const DeliveryActions=styled.View`
  flex-direction:row;
  background:#ffff;
  margin:20px;
  margin-top:0px;
  justify-content:space-between;
`;

export const Button=styled.TouchableOpacity`
  flex:1;
  border:1px solid #eee;
  border-radius:5px;
  align-items:center;
  padding:15px;
  background:${props=>props.disabled ? '#ddd' : '#fff' };

`;

export const ButtonText=styled.Text`
  color:#999999;
  font-size:12px;
  text-align:center;
`;

