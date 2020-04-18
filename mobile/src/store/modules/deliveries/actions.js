export function update(status) {
  return {
    type: '@deliveries/UPDATE_REQUEST',
    payload: { status },
  };
}
