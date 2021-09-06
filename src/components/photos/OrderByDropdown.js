import React from 'react';
import { ORDER_BY_FILTER_DATA_SOURCE } from '../../constants';

const OrderByDropdown = ({ currentValue, changePaginationFiltersHandler }) => {
  const renderDropdownItems = () => {
    return ORDER_BY_FILTER_DATA_SOURCE.map(item => {
      const isActive = item.value === currentValue;

      return (
        <li key={item.id}>
          <button
            className={`dropdown-item ${isActive ? 'active' : ''}`}
            aria-current={isActive}
            onClick={() => changePaginationFiltersHandler({ orderBy: item.value })}
          >
            {item.name}
          </button>
        </li>
      );
    });
  };

  return (
    <div>
      <p className="pagination-filter-label">ORDER BY</p>
      <div className="dropdown">
        <button
          type="button"
          id="order-by-dropdown-toggle"
          className="btn btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {ORDER_BY_FILTER_DATA_SOURCE.find(item => item.value === currentValue).name}
        </button>
        <ul className="dropdown-menu" aria-labelledby="order-by-dropdown-toggle">
          {renderDropdownItems()}
        </ul>
      </div>
    </div>
  );
};

export default OrderByDropdown;
