export const messages = (state = [], actions) => {
  switch (actions.type) {
    case 'SET_MESSAGES':
      return (state = actions.messages);
    default:
      return state;
  }
};
