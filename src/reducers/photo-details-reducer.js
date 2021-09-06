import { FETCH_PHOTO_DETAILS } from '../actions/types';

const photoDetailsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PHOTO_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

export default photoDetailsReducer;
