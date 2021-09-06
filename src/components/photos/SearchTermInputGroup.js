import React, { useEffect, useRef } from 'react';
import { initButtonIconTooltips } from '../../services';

const SearchTermInputGroup = ({ input, onResetButtonClick }) => {
  const searchTooltipRef = useRef();
  const filterTooltipRef = useRef();
  const filterResetTooltipRef = useRef();

  useEffect(() => {
    const tooltips = initButtonIconTooltips([
      { ref: searchTooltipRef, config: { title: 'Search' }},
      { ref: filterTooltipRef, config: { title: 'Filter' }},
      { ref: filterResetTooltipRef, config: { title: 'Reset' }}
    ]);

    return () => {
      tooltips.forEach(item => item.hide());
    };
  });

  return (
    <div className="input-group query-input-group">
      <button
        type="submit"
        className="btn btn-icon btn-primary"
        tabIndex="3"
        ref={searchTooltipRef}
      >
        <span className="las la-search"></span>
      </button>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-label="Search"
        tabIndex="1"
        {...input}
      />
      <button
        type="button"
        className="btn btn-icon btn-success"
        data-bs-toggle="collapse"
        data-bs-target="#filters"
        aria-expanded="false"
        tabIndex="2"
        ref={filterTooltipRef}
      >
        <span className="las la-filter"></span>
      </button>
      <button
        type="reset"
        className="btn btn-icon btn-secondary"
        onClick={onResetButtonClick}
        ref={filterResetTooltipRef}
      >
        <span className="las la-undo-alt"></span>
      </button>
    </div>
  );
};

export default SearchTermInputGroup;
