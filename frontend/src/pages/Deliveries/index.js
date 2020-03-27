import React from 'react';

import { Container } from './styles';

export default function Deliveries() {
  return (
    <Container>
      <header>
        <h1>Gerenciamento de encomendas</h1>
      </header>
      <div>
        <input type="text" placeholder="Buscar por encomendas" />
        <button type="button">Cadastrar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>#01</th>
            <td>Ludwing van Beethoven</td>
            <td>JD John Doe</td>
            <td>Rio Grande do Sul</td>
            <td>Santa Catarina</td>
            <td>Entregue</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
