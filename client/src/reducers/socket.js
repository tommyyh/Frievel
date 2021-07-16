export const socket = (state = {}, actions) => {
  switch (actions.type) {
    case 'SET_SOCKET':
      return (state = actions.socket);
    default:
      return state;
  }
};
