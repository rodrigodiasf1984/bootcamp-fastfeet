import React from 'react';
import { Input } from '@rocketseat/unform';
import { Container } from './styles';

export default function SearchInput({ ...rest }) {
  return (
    <Container>
      <Input type="text" name="search" {...rest} />
    </Container>
  );
}
