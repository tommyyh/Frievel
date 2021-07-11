export const posts = (state = [], actions) => {
  switch (actions.type) {
    case 'SET_POSTS':
      return (state = actions.posts);
    default:
      return state;
  }
};
