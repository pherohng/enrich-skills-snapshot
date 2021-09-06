import { CHANGE_PAGINATION } from './types';

export const changePagination = (paginationInfo) => {
  return {
    type: CHANGE_PAGINATION,
    payload: paginationInfo
  }
};
