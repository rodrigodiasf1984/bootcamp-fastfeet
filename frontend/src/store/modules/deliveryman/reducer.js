import produce from 'immer';

const INITIAL_STATE = {
  data: null,

};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliveryman/EDIT_REQUEST': {
        draft.data = action.payload.deliveryman;
        break;
      }
      case'@deliveryman/CLEAR':{
        draft.data=null;
      }
      default:
    }
  });
}
