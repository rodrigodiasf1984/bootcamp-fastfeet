import produce from 'immer';

const INITIAL_STATE = {
  deleteState: null,

};

export default function deleteGeneric(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/DELETE': {
        draft.editState = action.payload.data;
        //console.log(draft.editState);
        break;
      }
      default:
    }
  });
}
