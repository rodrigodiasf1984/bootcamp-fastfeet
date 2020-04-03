import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;
export const Button = styled.button.attrs((props) => ({
  backgroundButton: props.background,
}))`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 112px;
  padding: 0 16px;
  background: ${(props) => props.background};
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  svg {
    margin-right: 8px;
  }

  strong {
    color: #fff;
    display: flex;
  }

  &:hover {
    /* background: ${props =>darken(0.03, props.background)}; */
    background: ${darken(0.03, '#7159c1')};
  }

  cursor: pointer;
`;
