import * as uuid from 'uuid';

export const CONTENT_SAFETY_FILTER_DATA_SOURCE = [
  { id: uuid.v4(), value: 'low', name: 'Low' },
  { id: uuid.v4(), value: 'high', name: 'High' }
];

export const ORIENTATION_FILTER_DATA_SOURCE = [
  { id: uuid.v4(), value: '', name: 'Any' },
  { id: uuid.v4(), value: 'landscape', name: 'Landscape' },
  { id: uuid.v4(), value: 'portrait', name: 'Portrait' },
  { id: uuid.v4(), value: 'squarish', name: 'Squarish' }
];

export const COLOR_FILTER_DATA_SOURCE = [
  { id: uuid.v4(), value: '', name: 'Any' },
  { id: uuid.v4(), value: 'black_and_white', name: 'Black & White' },
  { id: uuid.v4(), value: 'black', name: 'Black' },
  { id: uuid.v4(), value: 'white', name: 'White' },
  { id: uuid.v4(), value: 'yellow', name: 'Yellow' },
  { id: uuid.v4(), value: 'orange', name: 'Orange' },
  { id: uuid.v4(), value: 'red', name: 'Red' },
  { id: uuid.v4(), value: 'purple', name: 'Purple' },
  { id: uuid.v4(), value: 'magenta', name: 'Magenta' },
  { id: uuid.v4(), value: 'green', name: 'Green' },
  { id: uuid.v4(), value: 'teal', name: 'Teal' },
  { id: uuid.v4(), value: 'blue', name: 'Blue' }
];

export const PAGE_SIZES_FILTER_DATA_SOURCE = [10, 15, 20, 25, 30];

export const ORDER_BY_FILTER_DATA_SOURCE = [
  { id: uuid.v4(), value: 'relevant', name: 'Relevant' },
  { id: uuid.v4(), value: 'latest', name: 'Latest' }
];

export const FILTER_FORM_CONTROLS_CONFIG = {
  contentFilter: {
    label: 'CONTENT SAFETY',
    source: CONTENT_SAFETY_FILTER_DATA_SOURCE
  },
  orientation: {
    label: 'ORIENTATION',
    source: ORIENTATION_FILTER_DATA_SOURCE
  },
  color: {
    label: 'COLOR',
    source: COLOR_FILTER_DATA_SOURCE
  }
};
