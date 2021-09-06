import { CHANGE_PAGINATION } from '../actions/types';

const INITIAL_STATE = {
  totalRecords: 0,
  totalPages: 0
};

const paginationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PAGINATION:
      return action.payload;
    default:
      return state;
  }
};

export default paginationReducer;
