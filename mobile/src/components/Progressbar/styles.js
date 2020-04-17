import styled from 'styled-components/native';

export const Container = styled.View``;

export const DeliveryStatus = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 52px;
  margin-top: 10px;
`;

export const Line = styled.View`
  border: 1px solid #7d40e7;
  width: 92px;
`;

export const Badge = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${(props) => (props.active ? '#7d40e7' : '#fff')};
  border: ${(props) => (props.active ? 'none' : '1px solid #7d40e7')};
`;

export const Steps = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
`;

export const Step = styled.View`
  align-items: center;
`;

export const StepText = styled.Text`
  width: 60px;
  text-align: center;
  font-size: 9px;
  color: #999;
  margin-top: 5px;
`;
