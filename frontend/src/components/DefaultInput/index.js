import React from 'react';
import { Container } from './styles';

export default function SearchInput({ ...rest }) {
  return (
    <Container>
      <input type="text" name="search" {...rest} />
    </Container>
  );
}
