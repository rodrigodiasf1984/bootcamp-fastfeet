import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  margin-top: 30px;
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }
    input {
      display: none;
    }
  }
`;
