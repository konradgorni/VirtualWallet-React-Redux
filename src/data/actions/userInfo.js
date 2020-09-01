export const userInfoAction = (email, uid) => {
  return {
    type: 'ADD_INFO',
    email,
    uid,
  };
};
