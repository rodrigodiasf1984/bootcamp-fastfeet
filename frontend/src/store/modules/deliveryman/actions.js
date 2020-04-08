export function editDeliveryman(deliveryman) {
  return {
    type: '@deliveryman/EDIT_REQUEST',
    payload: {deliveryman},
  };
}

export function clearDeliveryman(){
  return{
    type:'@deliveryman/CLEAR',
  }
}
