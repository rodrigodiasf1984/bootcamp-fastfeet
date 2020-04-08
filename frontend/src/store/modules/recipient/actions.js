export function editRecipient(recipient) {
  return {
    type: '@recipient/EDIT_REQUEST',
    payload: {recipient},
  };
}

export function clearRecipient(){
  return{
    type:'@recipient/CLEAR',
  }
}
