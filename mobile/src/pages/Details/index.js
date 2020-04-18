import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Background from '~/components/Background';
import api from '~/services/api';
import * as Toast from '~/components/Toast';
import { update } from '~/store/modules/deliveries/actions';

import {
  Container,
  Content,
  DeliveryDetails,
  InfoText,
  DeliveryActions,
  Status,
  IconAndTitle,
  DateValues,
  TitleLabel,
  SubtitleLabel,
  Dates,
  Button,
  ButtonText,
  DateText,
} from './styles';

export default function Details({ route, navigation }) {
  const delivery = route.params;
  const { recipient, deliveryman } = delivery;
  const dispatch = useDispatch();

  async function handlePickUp() {
    Toast.loading(true);
    try {
      await api.put(
        `/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`,
        {
          start_date: new Date(),
        }
      );
      dispatch(update(true));
      Toast.loading(false);
      Toast.successIcon('Encomenda retirada');
      navigation.goBack('Entregas');
    } catch (error) {
      Toast.loading(false);
      Toast.error(error.response.data.error);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Background />
      <Container>
        <Content>
          <DeliveryDetails>
            <IconAndTitle>
              <Icon name="local-shipping" size={25} color="#7D40E7" />
              <InfoText>Informações da entrega</InfoText>
            </IconAndTitle>
            <TitleLabel>DESTINATÁRIO</TitleLabel>
            <SubtitleLabel>{recipient.name}</SubtitleLabel>
            <TitleLabel>ENTREGA DE ENTREGA</TitleLabel>
            <SubtitleLabel>
              {recipient.street}, {recipient.street_number},{' '}
              {recipient.complement && recipient.complement} - {recipient.city}{' '}
              - {recipient.uf},{recipient.postal_code}
            </SubtitleLabel>
            <TitleLabel>PRODUTO</TitleLabel>
            <SubtitleLabel>{delivery.product}</SubtitleLabel>
          </DeliveryDetails>
          <Status>
            <IconAndTitle>
              <Icon name="event" size={25} color="#7D40E7" />
              <InfoText>Situação da entrega</InfoText>
            </IconAndTitle>
            <TitleLabel>Status</TitleLabel>
            <SubtitleLabel>
              {delivery.endDate ? 'Entregue' : 'Pendente'}
            </SubtitleLabel>
            <Dates>
              <DateValues>
                <TitleLabel>DATA DE RETIRADA</TitleLabel>
                <DateText>
                  {delivery.startedDate !== null
                    ? delivery.startedDate
                    : '--/--/----'}
                </DateText>
              </DateValues>
              <DateValues>
                <TitleLabel>DATA DE ENTREGA</TitleLabel>
                <DateText>
                  {delivery.endDate !== null ? delivery.endDate : '--/--/----'}
                </DateText>
              </DateValues>
            </Dates>
          </Status>
          <DeliveryActions>
            <Button disabled={!!delivery.startedDate} onPress={handlePickUp}>
              <>
                <Icon
                  name="unarchive"
                  size={25}
                  color={!delivery.startedDate ? '#82BF18' : '#999'}
                />
                <ButtonText>Retirar encomenda</ButtonText>
              </>
            </Button>
            <Button
              disabled={!delivery.startedDate || delivery.endDate}
              onPress={() =>
                navigation.navigate('DeliveryProblem', delivery.id)
              }
            >
              <>
                <Icon
                  name="highlight-off"
                  size={25}
                  color={delivery.startedDate ? '#E74040' : '#999'}
                />
                <ButtonText>Informar Problema</ButtonText>
              </>
            </Button>
            <Button
              disabled={!delivery.startedDate }
              onPress={() => navigation.navigate('ListProblems', delivery.id)}
            >
              <>
                <Icon
                  name="info-outline"
                  size={25}
                  color={delivery.start_date ? '#E7BA40' : '#999'}
                />
                <ButtonText>Visualizar Problemas</ButtonText>
              </>
            </Button>
            <Button
              disabled={!delivery.startedDate || delivery.endDate}
              onPress={() =>
                navigation.navigate('ConfirmDelivery', {
                  delivery_id: delivery.id,
                  deliveryman_id: deliveryman.id,
                })
              }
            >
              <>
                <Icon
                  name="check-circle"
                  size={25}
                  color={delivery.start_date ? '#7D40E7' : '#999'}
                />
                <ButtonText>Confirmar Entrega</ButtonText>
              </>
            </Button>
          </DeliveryActions>
        </Content>
      </Container>
    </>
  );
}

Details.propTypes = {
  navigation: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};
