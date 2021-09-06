import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import queryParamsReducer from './query-params-reducer';
import photosReducer from './photos-reducer';
import paginationReducer from './pagination-reducer';
import photoDetailsReducer from './photo-details-reducer';
import authReducer from './auth-reducer';
import userDetailsReducer from './user-details-reducer';

export default combineReducers({
  form: formReducer,
  queryParams: queryParamsReducer,
  photos: photosReducer,
  pagination: paginationReducer,
  photoDetails: photoDetailsReducer,
  userId: authReducer,
  userDetails: userDetailsReducer
});
