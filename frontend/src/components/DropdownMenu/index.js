import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import history from '~/services/history';
import { editDelivery } from '~/store/modules/delivery/actions';
import { editRecipient } from '~/store/modules/recipient/actions';
import { editDeliveryman } from '~/store/modules/deliveryman/actions';
import {
  Container,
  ActionButton,
  ActionIcon,
  OptionList,
  Option,
} from './styles';

export default function DropdownMenu({
  openModalFunction,
  openModalProblemFunction,
  editData,
  delivery,
  deliveryman,
  recipient,
  handleDelete,
  inPackages,
  inRecipients,
  inDeliverymans,
  inProblems,
  deliveryProblem,
}) {
  // console.tron.log(deliveryProblem,'Problem');
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleEdit() {
    if (inPackages) {
      dispatch(editDelivery(editData));
      history.push('/RegisterDelivery');
    } else if (inRecipients) {
      dispatch(editRecipient(editData));
      history.push('/RegisterRecipients');
    } else if (inDeliverymans) {
      dispatch(editDeliveryman(editData));
      history.push('/RegisterDeliverymans');
    }
  }

  async function handleDel() {
    let confirmation = '';
    if (deliveryProblem) {
      confirmation = window.confirm('Tem certeza que deseja cancelar?');
    } else {
      confirmation = window.confirm('Tem certeza que deseja apagar?');
    }
    if (confirmation) {
      if (delivery) {
        handleDelete(delivery);
      } else if (recipient) {
        handleDelete(recipient);
      } else if (deliveryman) {
        handleDelete(deliveryman);
      } else if (deliveryProblem) {
        handleDelete(deliveryProblem);
      }
    }
  }
  return (
    <Container>
      <ActionButton onClick={handleToggleVisible}>
        <ActionIcon />
      </ActionButton>
      <OptionList
        visible={visible}
        onMouseLeave={handleToggleVisible}
        inProblems={inProblems}
      >
        {!inProblems && (
          <Option onClick={handleEdit}>
            <MdEdit color="#4D85EE" />
            <button type="button">Editar</button>
          </Option>
        )}

          <Option onClick={handleDel}>
          {inProblems && !deliveryProblem.delivery.canceled_at ? (
            <MdDeleteForever color="#DE3B3B" />
          ): inProblems && deliveryProblem.delivery.canceled_at ? '' :(
            <MdDeleteForever color="#DE3B3B" />
          ) }
            <button type="button">
              {inProblems && !deliveryProblem.delivery.canceled_at ?
               'Cancelar': inProblems && deliveryProblem.delivery.canceled_at ?  '' : 'Excluir'}</button>
          </Option>


        {inPackages && (
          <Option>
            <IoMdEye color="#8E5BE8 " />
            <button onClick={() => openModalFunction(delivery)} type="button">
              Visualizar
            </button>
          </Option>
        )}

        {inProblems && (
          <Option>
            <IoMdEye color="#8E5BE8 " />
            <button
              onClick={() => openModalProblemFunction(deliveryProblem)}
              type="button"
            >
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
  openModalProblemFunction: null,
  handleDelete: null,
  inRecipients: false,
  inDeliverymans: false,
  inProblems: false,
};

DropdownMenu.propTypes = {
  inPackages: PropTypes.bool,
  inRecipients: PropTypes.bool,
  inDeliverymans: PropTypes.bool,
  inProblems: PropTypes.bool,
  openModalFunction: PropTypes.func,
  openModalProblemFunction: PropTypes.func,
  handleDelete: PropTypes.func,
  delivery: PropTypes.shape(),
  editData: PropTypes.shape(),
  deliveryman: PropTypes.shape(),
  deliveryProblem: PropTypes.shape(),
  recipient: PropTypes.shape(),
};
