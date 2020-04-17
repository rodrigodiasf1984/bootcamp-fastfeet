import { takeLatest, call, put, all} from 'redux-saga/effects';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
import * as Toast from '~/components/Toast/index';

export function* signIn({ payload }) {
  try {
    const {id} = payload;
    const response = yield call(api.get, `deliverymans/${id}`);

    if (!response.data) {
     Toast.error('Utilizador não encontrado com o ID fornecido!');
      return;
    }
    //yield delay(3000);
    yield put(signInSuccess(response.data));
  } catch (error) {
    //console.tron.log(error.response.data.error);
    Toast.error(error.response.data.error);
    yield put(signFailure());
  }
}0
export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
