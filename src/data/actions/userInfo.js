import * as constants from '../constants';
export const userInfoAction = (email, uid) => {
  return {
    type: constants.ADD_INFO,
    email,
    uid,
  };
};
