import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #dddddd;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      max-width: 135px;
      max-height: 26;
    }
    a {
      font-weight: bold;
      color: #999;
      margin-right: 10px;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.4, '#999')};
      }

      &:active {
        color: ${darken(1, '#999')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;

  div {
    display: flex;
    flex-direction: column;

    strong {
      display: block;
    }

    button {
      display: flex;
      margin-top: 2px;
      font-size: 14px;
      color: #de3b3b;
      background: none;
      border: 0;
      transition: color 0.2s;

      &:hover {
        color: ${lighten(0.03, '#444')};
      }
    }
  }
`;
