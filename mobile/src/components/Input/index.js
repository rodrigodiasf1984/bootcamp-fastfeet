import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Container, TextInput } from './styles';

function Input({ style, ...rest }, ref) {
  return (
    <Container style={style}>
      <TextInput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  style: {},
};

export default forwardRef(Input);
