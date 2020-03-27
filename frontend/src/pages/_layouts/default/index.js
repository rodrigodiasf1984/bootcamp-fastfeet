import React from 'react';
import PropTypes from 'prop-types';
import Header from '~/components/Header';
import { Wrapper, Content } from './styles';

export default function DefaultLayout({ children }) {
  // children são todos componentes deste layout
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
