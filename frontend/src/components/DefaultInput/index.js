import React from 'react';
import { Container } from './styles';
import {Input} from '@rocketseat/unform';

export default function SearchInput({ ...rest }) {
  return (
    <Container>
      <Input type="text" name="search" {...rest} />
    </Container>
  );
}
