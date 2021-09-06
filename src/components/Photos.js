import React from 'react';
import Search from './photos/Search';
import SearchResult from './photos/SearchResult';

const Photos = () => {
  return (
    <React.Fragment>
      <Search />
      <SearchResult />
    </React.Fragment>
  );
};

export default Photos;
