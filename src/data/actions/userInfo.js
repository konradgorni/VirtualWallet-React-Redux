export const userInfo = (email, uid) => {
  return {
    type: 'ADD_INFO',
    email: email,
    uid: uid,
  };
};
