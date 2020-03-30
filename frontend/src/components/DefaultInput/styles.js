import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  width: 95%;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

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
