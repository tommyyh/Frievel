export const unread = (state = 0, actions) => {
  switch (actions.type) {
    case 'SET_UNREAD':
      return (state = actions.unread);
    default:
      return state;
  }
};
