import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-360deg, #7d40e7, #431eb1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  max-height: 400px;
  text-align: center;
  background: #fff;
  border: 0;
  border-radius: 4px;
  padding: 30px 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h1 {
        font-size: 14px;
        margin: 0 0 10px;
      }

      input {
        width: 100%;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        height: 44px;
        padding: 0 15px;
        color: #000;
        margin: 0 0 10px;
        font-size: 16px;

        &::placeholder {
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }

    span {
      color: #f00;
      align-self: flex-start;
      margin: 0 0 5px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      border: 0;
      border-radius: 4px;
      background: #7d40e7;
      width: 100%;
      color: #fff;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;
