import produce from 'immer';

const INITIAL_STATE = {
  editState: null,

};

export default function edit(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/EDIT': {
        draft.editState = action.payload.data;
        //console.log(draft.editState);
        break;
      }
      default:
    }
  });
}
