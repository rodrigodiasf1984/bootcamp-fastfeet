import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import { Container, List, Content, TitleProblem } from './styles';
import api from '~/services/api';
import Problem from '~/components/Problem';

export default function ListProblems({ route }) {
  const [problems, setProblems] = useState('');
  const id = route.params;
  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`/delivery/${id}/problems`);

      const data = response.data.map((item) => ({
        ...item,
        createdDate: format(parseISO(item.created_at), 'dd/MM/yyyy'),
      }));

      setProblems(data);
    }
    loadProblems();
  }, []);

  return (
    <>
      <Background />
      <Container>
        <Content>
          <TitleProblem>Encomenda {id}</TitleProblem>
          <List
            data={problems}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Problem data={item} />}
          />
        </Content>
      </Container>
    </>
  );
}

ListProblems.propTypes = {
  route: PropTypes.shape().isRequired,
};
