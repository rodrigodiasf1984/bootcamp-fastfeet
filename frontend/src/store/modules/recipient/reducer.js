import produce from 'immer';

const INITIAL_STATE = {
  data: null,

};

export default function recipient(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@recipient/EDIT_REQUEST': {
        draft.data = action.payload.recipient;
        break;
      }
      case'@recipient/CLEAR':{
        draft.data=null;
      }
      default:
    }
  });
}
