import { CHANGE_QUERY_PARAMS } from '../actions/types';

const INITIAL_STATE = {
  contentFilter: 'low',
  page: 1,
  pageSize: 20,
  orderBy: 'relevant'
};

const queryParamsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_QUERY_PARAMS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default queryParamsReducer;
