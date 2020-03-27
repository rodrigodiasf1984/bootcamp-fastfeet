import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Link to="/deliveries">ENCOMENDAS</Link>
          <Link to="/deliverymans">ENTREGADORES</Link>
          <Link to="/recipients">DESTINATÁRIOS</Link>
          <Link to="/deliveryProblems">PROBLEMAS</Link>
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
