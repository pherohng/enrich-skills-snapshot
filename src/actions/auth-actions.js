import { AUTH } from './types';

export const authenticate = (userId) => {
  return {
    type: AUTH,
    payload: userId
  };
};
