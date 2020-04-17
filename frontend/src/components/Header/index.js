import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, Profile } from './styles';
import { signOutRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavLink to="/deliveries" activeStyle={{color:'#444444'}}>ENCOMENDAS</NavLink>
          <NavLink to="/deliverymans" activeStyle={{color:'#444444'}}>ENTREGADORES</NavLink>
          <NavLink to="/recipients" activeStyle={{color:'#444444'}}>DESTINATÁRIOS</NavLink>
          <NavLink to="/deliveryProblems" activeStyle={{color:'#444444'}}>PROBLEMAS</NavLink>
        </nav>
        <Profile>
          <div>
            <strong>{profile.name}</strong>
            <button type="button" onClick={handleSignOut}>
              Sair do sistema
            </button>
          </div>
        </Profile>
      </Content>
    </Container>
  );
}
