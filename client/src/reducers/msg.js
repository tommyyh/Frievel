export const msg = (state = [], actions) => {
  switch (actions.type) {
    case 'SET_MSG':
      return (state = actions.msg);
    default:
      return state;
  }
};
