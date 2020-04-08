import produce from 'immer';

const INITIAL_STATE = {
  data: null,

};

export default function delivery(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@delivery/EDIT_REQUEST': {
        draft.data = action.payload.delivery;
        break;
      }
      case'@delivery/CLEAR':{
        draft.data=null;
      }
      default:
    }
  });
}
