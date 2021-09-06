import { CHANGE_QUERY_PARAMS } from './types';

export const changeQueryParams = (queryParams) => {
  return {
    type: CHANGE_QUERY_PARAMS,
    payload: queryParams
  };
};
