import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-tiny-toast';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';


function toastErro({msg}) {
  Toast.show(msg, {
    position: Toast.position.TOP,
    containerStyle: {
      backgroundColor: '#7159c1',
      borderRadius: 15,
    },
    textStyle: {
      color: '#fff',
    },
    imgStyle: {},
    mask: true,
    maskStyle: {},
  });
}

export function* signIn({ payload }) {
  try {
    const {id} = payload;

    const response = yield call(api.get, `deliverymans/${id}`);

    if (!response.data) {
      toastErro('Utilizador não encontrado com o ID fornecido!');
      return;
    }

    yield put(signInSuccess(response.data));
  } catch (error) {
    toastErro('Houve um erro no login verifique seus dados');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
