import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { StatusBar } from 'react-native';

import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Deliveryman,
  Greetings,
  DeliverymanName,
  DeliveriesActions,
  Actions,
  TitleDeliveries,
  Logout,
  DeliveryList,
  ButtonFilter,
  ButtonFilterText,
  Image,
  EmptyList,
  InfoList,
} from './styles';
import Delivery from '~/components/Delivery';
import Avatar from '~/components/Avatar';
import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import { update } from '~/store/modules/deliveries/actions';

export default function Deliveries({ navigation }) {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('false');
  const [refresh, setRefresh]=useState(false);
  const [page, setPage]=useState(1);
  const deliveryman = useSelector((state) => state.auth.deliveryman);
  const status = useSelector((state) => state.deliveries.status);

  const urlFormated =
    deliveryman.avatar &&
    deliveryman.avatar.url.replace('localhost', '10.0.2.2');
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  function seeDetails(data){
    setPage(1);
    navigation.navigate('Details', data);
  }

  console.tron.log(status,'1');
  const loadDeliveries= useCallback( async ()=> {
    setLoading(true);
    const response = await api.get(
      `/deliveryman/${deliveryman.id}/deliveries?filter=${filter}`,{
         params:{ page }
      }
      );
      const data = response.data.map((item) => ({
        ...item,
        createdDate: format(parseISO(item.createdAt), 'dd/MM/yyyy'),
        startedDate:
        item.start_date && format(parseISO(item.start_date), 'dd/MM/yyyy'),
        endDate: item.end_date && format(parseISO(item.end_date), 'dd/MM/yyyy'),
      }));
      setDeliveries(page>=2 ? [...deliveries, ...data]: data);
      setLoading(false);
      setRefresh(false);
    },[deliveryman.id, filter, page]);

    useEffect(() => {
      loadDeliveries();
      dispatch(update(false));
    }, [loadDeliveries, page, filter, status]);
    console.tron.log(status, '2');
    function refreshDeliveries(){
      setRefresh(true);
      setPage(1);
      setDeliveries([]);
      loadDeliveries();
    }

    function loadMoreDeliveries(){
      setPage(page+1);
    }

    function handleSubmit(filterP) {
      setPage(1);
      setFilter(filterP);
      setDeliveries([]);
    }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <Header>
          {urlFormated ? (
            <Image
              source={{
                uri: urlFormated,
              }}
            />
          ) : (
            <Avatar size={80} />
          )}
          <Deliveryman>
            <Greetings>Bem vindo de volta,</Greetings>
            <DeliverymanName>{deliveryman.name}</DeliverymanName>
          </Deliveryman>
          <Logout onPress={handleLogout}>
            <Icon name="exit-to-app" size={25} color="#E74040" />
          </Logout>
        </Header>
        <DeliveriesActions>
          <TitleDeliveries>Entregas</TitleDeliveries>
          <Actions>
            <ButtonFilter onPress={() => handleSubmit('false')}>
              <ButtonFilterText isActive={filter === 'false'}>
                Pendentes
              </ButtonFilterText>
            </ButtonFilter>
            <ButtonFilter onPress={() => handleSubmit('true')}>
              <ButtonFilterText isActive={filter === 'true'}>
                Entregues
              </ButtonFilterText>
            </ButtonFilter>
          </Actions>
        </DeliveriesActions>
        {deliveries.length > 0 ? (
          <DeliveryList
            onRefresh={refreshDeliveries}
            refreshing={refresh}
            onEndReachedThreshold={0.2}
            onEndReached={loadMoreDeliveries}
            data={deliveries}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Delivery seeDetails={seeDetails} data={item} navigation={navigation} />
            )}
          />
        ) : (
          <EmptyList>
            <Icon name="event-busy" size={55} color="#E74040" />
            <InfoList>Não exite entregas ainda</InfoList>
          </EmptyList>
        )}
      </Container>
    </>
  );
}

Deliveries.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({ color }) => <Icon name="menu" size={25} color={color} />,
};

Deliveries.propTypes = {
  navigation: PropTypes.shape().isRequired,
};
