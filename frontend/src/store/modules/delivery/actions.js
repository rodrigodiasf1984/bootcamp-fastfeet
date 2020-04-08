export function editDelivery(delivery) {
  return {
    type: '@delivery/EDIT_REQUEST',
    payload: {delivery},
  };
}

export function clearDelivery(){
  return{
    type:'@delivery/CLEAR',
  }
}
