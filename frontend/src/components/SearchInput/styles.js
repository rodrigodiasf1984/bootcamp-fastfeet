import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  width: 240px;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  svg {
    margin-right: 8px;
  }

  input {
    width: 100%;
    font-size: 14px;
    border: 0;
    background: none;
    color: #444;

    ::placeholder {
      color: #999;
    }
  }
`;
