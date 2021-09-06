import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CONTENT_COL_CLASS_NAME } from '../../constants';
import { changeQueryParams, fetchPhotos, changePagination } from '../../actions';
import ResultSummary from './ResultSummary';
import PaginationFilters from './PaginationFilters';
import PhotoGrid from './PhotoGrid';

const SearchResult = ({ queryParams, photos, pagination, changeQueryParams, fetchPhotos, changePagination }) => {
  useEffect(() => {
    if (queryParams.query) {
      fetchPhotos(queryParams, (paginationInfo) => {
        changePagination(paginationInfo);
      });
    }
  }, [queryParams, fetchPhotos, changePagination]);

  const changePaginationFiltersHandler = (paginationFilters) => {
    const queryParams = { ...paginationFilters };

    if (
      queryParams.page !== undefined
      && queryParams.page !== null
      && (queryParams.page < 1 || queryParams.page > pagination.totalPages)
    ) {
      queryParams.page = 1;
    }

    changeQueryParams(queryParams);
  };

  const renderResult = () => {
    if (pagination.totalRecords === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <PaginationFilters {...queryParams} totalPages={pagination.totalPages} changePaginationFiltersHandler={changePaginationFiltersHandler} />
        <PhotoGrid photos={photos} />
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (!photos) {
      return null;
    }

    return (
      <div id="search-result-section-container" className="container-fluid">
        <div className="row justify-content-center">
          <section id="search-result-section" className={CONTENT_COL_CLASS_NAME}>
            <ResultSummary totalRecords={pagination.totalRecords} />
            {renderResult()}
          </section>
        </div>
      </div>
    );
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return {
    queryParams: state.queryParams,
    photos: state.photos,
    pagination: state.pagination
  };
};

export default connect(
  mapStateToProps,
  { changeQueryParams, fetchPhotos, changePagination }
)(SearchResult);
