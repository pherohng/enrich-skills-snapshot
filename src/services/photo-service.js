import axios from 'axios';
import { UNSPLASH_CONFIG } from '../configs';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_CONFIG.ACCESS_KEY}`
  }
});

export const getPhotos = (queryParams) => {
  return unsplash.get('/search/photos', {
    params: {
      ...queryParams,
      content_filter: queryParams.contentFilter,
      orientation: queryParams.orientation || null,
      color: queryParams.color || null,
      per_page: queryParams.pageSize,
      order_by: queryParams.orderBy
    }
  });
};

export const getPhotoDetails = (id) => {
  return unsplash.get(`photos/${id}`);
};
