import produce from 'immer';

const INITIAL_STATE = {
  status: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliveries/UPDATE_REQUEST': {
        draft.status = action.payload.status;
        break;
      }
      default:
    }
  });
}
