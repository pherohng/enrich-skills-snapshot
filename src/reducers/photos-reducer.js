import { FETCH_PHOTOS } from '../actions/types';

const photosReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return action.payload;
    default:
      return state;
  }
};

export default photosReducer;
