import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';

import {
  Container,
  ActionButton,
  ActionIcon,
  OptionList,
  Option,
} from './styles';

export default function DropdownMenu({ inPackages, openModalFunction, pack }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <ActionButton onClick={handleToggleVisible}>
        <ActionIcon />
      </ActionButton>

      <OptionList visible={visible} onMouseLeave={handleToggleVisible}>
        <Option>
          <MdEdit color="#4D85EE" />
          <button type="button">Editar</button>
        </Option>

        <Option>
          <MdDeleteForever color="#DE3B3B" />
          <button type="button">Excluir</button>
        </Option>

        {inPackages && (
          <Option>
            <IoMdEye color="#8E5BE8 " />
            <button onClick={() => openModalFunction(pack)} type="button">
              Visualizar
            </button>
          </Option>
        )}
      </OptionList>
    </Container>
  );
}

DropdownMenu.defaultProps = {
  inPackages: false,
  openModalFunction: null,
};

DropdownMenu.propTypes = {
  inPackages: PropTypes.bool,
  openModalFunction: PropTypes.func,
  pack: PropTypes.object,
};
