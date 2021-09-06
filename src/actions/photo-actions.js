import { trackPromise } from 'react-promise-tracker';
import { getPhotoDetails, getPhotos } from '../services';
import { FETCH_PHOTO_DETAILS, FETCH_PHOTOS } from './types';

export const fetchPhotos = (queryParams, changePaginationCallback = null) => async (dispatch) => {
  const response = await trackPromise(getPhotos(queryParams));

  dispatch({
    type: FETCH_PHOTOS,
    payload: response.data.results.map(item => ({
      id: item.id,
      src: item.urls.thumb,
      width: item.width,
      height: item.height,
      alt: item.alt_description,
      key: item.id
    }))
  });

  if (changePaginationCallback) {
    changePaginationCallback({
      totalRecords: response.data.total,
      totalPages: response.data.total_pages
    });
  }
};

export const fetchPhotoDetails = (id) => async (dispatch) => {
  if (!id) {
    dispatch({
      type: FETCH_PHOTO_DETAILS,
      payload: null
    });
    return;
  }

  const response = await trackPromise(getPhotoDetails(id));

  dispatch({
    type: FETCH_PHOTO_DETAILS,
    payload: response.data
  });
};
