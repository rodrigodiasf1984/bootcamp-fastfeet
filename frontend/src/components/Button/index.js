import React from 'react';
import { Container, Button } from './styles';

export default function ButtonDone({ ...rest }) {
  return (
    <Container>
      <Button type="submit" {...rest} />
    </Container>
  );
}
