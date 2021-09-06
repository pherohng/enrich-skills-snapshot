import { trackPromise } from 'react-promise-tracker';
import { getUserDetails } from '../services';
import { FETCH_USER_DETAILS } from './types';

export const fetchUserDetails = (id, redirectCallback = null) => async (dispatch) => {
  if (!id) {
    dispatch({
      type: FETCH_USER_DETAILS,
      payload: null
    });
    return;
  }

  const userSnapshot = await trackPromise(getUserDetails(id));

  if (userSnapshot.exists) {
    dispatch({
      type: FETCH_USER_DETAILS,
      payload: userSnapshot.data()
    });

    if (redirectCallback) {
      redirectCallback();
    }
  } else {
    dispatch({
      type: FETCH_USER_DETAILS,
      payload: null
    });
  }
};
