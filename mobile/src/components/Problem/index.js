import React from 'react';
import PropTypes from 'prop-types';
import { Container, ProblemText, ProblemDate } from './styles';

export default function Problem({ data }) {
  console.tron.log(data);
  return (
    <>
      <Container>
        <ProblemText>{data.description}</ProblemText>
        <ProblemDate>{data.createdDate}</ProblemDate>
      </Container>
    </>
  );
}

Problem.propTypes = {
  data: PropTypes.shape().isRequired,
};
