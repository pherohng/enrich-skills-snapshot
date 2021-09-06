import React from 'react';
import { PAGE_SIZES_FILTER_DATA_SOURCE } from '../../constants';

const PageSizeDropdown = ({ currentValue, changePaginationFiltersHandler }) => {
  const renderDropdownItems = () => {
    return PAGE_SIZES_FILTER_DATA_SOURCE.map(item => {
      const isActive = item === currentValue;

      return (
        <li key={item}>
          <button
            className={`dropdown-item ${isActive ? 'active' : ''}`}
            aria-current={isActive}
            onClick={() => changePaginationFiltersHandler({ page: 1, pageSize: item })}
          >
            {item}
          </button>
        </li>
      );
    });
  };

  return (
    <div className="me-3">
      <p className="pagination-filter-label">PAGE SIZE</p>
      <div className="dropdown">
        <button
          type="button"
          id="page-size-dropdown-toggle"
          className="btn btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {currentValue}
        </button>
        <ul className="dropdown-menu" aria-labelledby="page-size-dropdown-toggle">
          {renderDropdownItems()}
        </ul>
      </div>
    </div>
  );
};

export default PageSizeDropdown;
