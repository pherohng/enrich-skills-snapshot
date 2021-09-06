import { FETCH_USER_DETAILS } from '../actions/types';

const userDetailsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

export default userDetailsReducer;
