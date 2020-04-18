import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';

import {
  Container,
  NameLabel,
  Name,
  Email,
  EmailLabel,
  DateLabel,
  RegisteredDate,
  ButtonLogout,
  Info,
  Image,
  ButtonText,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import Avatar from '~/components/Avatar';

export default function Profile() {
  const deliveryman = useSelector((state) => state.auth.deliveryman);
  const { url } = deliveryman.avatar;
  const urlFormated = url.replace('localhost', '10.0.2.2');
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      {urlFormated ? (
        <Image
          source={{
            uri: urlFormated,
          }}
        />
      ) : (
        <Avatar size={80} />
      )}
      <Info>
        <NameLabel>Nome completo</NameLabel>
        <Name>{deliveryman.name}</Name>
        <EmailLabel>Email</EmailLabel>
        <Email>{deliveryman.email}</Email>
        <DateLabel>Data de cadastro</DateLabel>
        <RegisteredDate>
          {format(parseISO(deliveryman.createdAt), 'dd/MM/yyyy')}
        </RegisteredDate>
        <ButtonLogout onPress={handleLogout}>
          <ButtonText>Logout</ButtonText>
        </ButtonLogout>
      </Info>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ color }) => <Icon name="person" size={25} color={color} />,
};
