import React from 'react';
import PageSizeDropdown from './PageSizeDropdown';
import OrderByDropdown from './OrderByDropdown';
import PageNav from './PageNav';

const PaginationFilters = ({ page, pageSize, orderBy, totalPages, changePaginationFiltersHandler }) => {
  return (
    <div id="pagination-filters" className="row">
      <div className="col-6 d-flex">
        <PageSizeDropdown
          currentValue={pageSize}
          changePaginationFiltersHandler={changePaginationFiltersHandler}
        />
        <OrderByDropdown
          currentValue={orderBy}
          changePaginationFiltersHandler={changePaginationFiltersHandler}
        />
      </div>

      <div className="col-6 d-flex justify-content-end">
        <PageNav
          currentValue={page}
          totalPages={totalPages}
          changePaginationFiltersHandler={changePaginationFiltersHandler}
        />
      </div>
    </div>
  );
};

export default PaginationFilters;
