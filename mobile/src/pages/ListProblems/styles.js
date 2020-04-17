import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex:1;
  background: #fff;
  padding:0px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator:false,
  contentContainerStyle:{padding:30}
})`
`;
export const Content= styled.View`
  margin-top:-100px;
`;

export const TitleProblem = styled.Text`
  color:#fff;
  margin-bottom:0px;
  align-self:center;
  font-weight:bold;
  font-size:20px;
`;





