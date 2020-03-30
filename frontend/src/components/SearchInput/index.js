import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Container } from './styles';

export default function DefaultInput({ ...rest }) {
  return (
    <Container>
      <MdSearch color="#999" size={25} />
      <input type="text" name="search" {...rest} />
    </Container>
  );
}
