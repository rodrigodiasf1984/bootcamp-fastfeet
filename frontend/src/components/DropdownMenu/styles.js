import styled from 'styled-components';

import { MdMoreHoriz } from 'react-icons/md';
import { darken } from 'polished';

export const Container = styled.div`
  align-self: center;
  display: flex;
  position: relative;
  background: #ffffff;
`;

export const ActionButton = styled.button`
  display: flex;
  float: right;
  border: 0;
  background: none;
`;

export const ActionIcon = styled(MdMoreHoriz).attrs({
  size: 25,
})`
  margin-right: 2px;
  color: #c6c6c6;
`;

export const OptionList = styled.div`
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(100% + 30px);
  border-radius: 4px;
  background: #ffffff;
  height: auto;
  z-index: 1;

  border: black;

  padding: 15px 5px;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  filter: drop-shadow(0.5px 0.5px 0.5px black);

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ffffffff;
  }
`;

export const Option = styled.div`
  display: flex;

  justify-content: center;

  button {
    margin-left: 5px;
    border: 0;
    color: #999999;
    background: none;
  }

  button:hover {
    color: ${darken(0.5, '#999999')};
  }

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eeeeee;
  }
`;
