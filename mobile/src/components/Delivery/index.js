import React from 'react';
import { View } from 'react-native';
import Progressbar from '~/components/Progressbar';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container, DeliveryInfo, DeliveryId,Datas,
  DateHeader, HeaderDateTitle, HeaderCity,
  DateHeaderValues, Date, City, Details, DetailsText
} from './styles';

export default function Delivery({navigation, data}) {
  // console.tron.log(data, 'data2');
  const status = data.end_date
    ? 'delivered'
    : data.start_date
    ? 'withdrawal'
    : 'waiting';
  return (
    <Container>
      <DeliveryInfo>
        <Icon name="local-shipping" size={25} color='#7D40E7'/>
        <DeliveryId>Encomenda {data.id}</DeliveryId>
      </DeliveryInfo>
      <Progressbar status={status}/>
      <Datas>
        <DateHeader>
          <HeaderDateTitle>Data</HeaderDateTitle>
          <HeaderCity>Cidade</HeaderCity>
          <View></View>
        </DateHeader>
        <DateHeaderValues>
          <Date>{data.createdDate}</Date>
          <City>{data.recipient.city}</City>
          <Details onPress={()=> navigation.navigate('Details', data)}>
            <DetailsText>Ver detalhes</DetailsText>
          </Details>
        </DateHeaderValues>
      </Datas>
  </Container>
  );
}
