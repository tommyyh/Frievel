export const name = (state = '', actions) => {
  switch (actions.type) {
    case 'SET_NAME':
      return (state = actions.name);
    default:
      return state;
  }
};

export const username = (state = '', actions) => {
  switch (actions.type) {
    case 'SET_USERNAME':
      return (state = actions.username);
    default:
      return state;
  }
};

export const email = (state = '', actions) => {
  switch (actions.type) {
    case 'SET_EMAIL':
      return (state = actions.email);
    default:
      return state;
  }
};

export const profilePic = (state = '', actions) => {
  switch (actions.type) {
    case 'SET_PROFILE_PIC':
      return (state = actions.profilePic);
    default:
      return state;
  }
};
