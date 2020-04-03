import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import history from '~/services/history';
import {setEdit} from '~/store/modules/edit/actions';
import {useDispatch} from 'react-redux';

import {
  Container,
  ActionButton,
  ActionIcon,
  OptionList,
  Option,
} from './styles';

export default function DropdownMenu({ deliveries, openModalFunction, delivery }) {
  const [visible, setVisible] = useState(false);
  const dispatch= useDispatch();
  function handleToggleVisible() {

    setVisible(!visible);
  }

  function handleEdit(){
   dispatch(setEdit(delivery));
    history.push('/RegisterDelivery');
  }


  return (
    <Container>
      <ActionButton onClick={handleToggleVisible}>
        <ActionIcon />
      </ActionButton>
      <OptionList visible={visible} onMouseLeave={handleToggleVisible}>
        <Option onClick={handleEdit}>
          <MdEdit color="#4D85EE" />
          <button type="button" >Editar</button>
        </Option>

        <Option>
          <MdDeleteForever color="#DE3B3B" />
          <button type="button">Excluir</button>
        </Option>

        {deliveries && (
          <Option>
            <IoMdEye color="#8E5BE8 " />
            <button onClick={() => openModalFunction(delivery)} type="button">
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
