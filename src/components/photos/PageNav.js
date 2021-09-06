import React, { useEffect, useRef } from 'react';
import { initButtonIconTooltips } from '../../services';

const PageNav = ({ currentValue, totalPages, changePaginationFiltersHandler }) => {
  const prevTooltipRef = useRef();
  const nextTooltipRef = useRef();

  useEffect(() => {
    const tooltips = initButtonIconTooltips([
      { ref: prevTooltipRef, config: { title: 'Previous' }},
      { ref: nextTooltipRef, config: { title: 'Next' }}
    ]);

    return () => {
      tooltips.forEach(item => item.hide());
    };
  });

  return (
    <div>
      <p className="pagination-filter-label text-end">PAGE</p>
      <div className="btn-group">
        <button
          className="btn btn-icon btn-outline-secondary"
          onClick={() => changePaginationFiltersHandler({ page: currentValue - 1})}
          disabled={currentValue === 1}
          ref={prevTooltipRef}
        >
          <span className="las la-angle-left"></span>
        </button>
        <button
          className="btn btn-icon btn-outline-secondary"
          onClick={() => changePaginationFiltersHandler({ page: currentValue + 1})}
          disabled={currentValue === totalPages}
          ref={nextTooltipRef}
        >
          <span className="las la-angle-right"></span>
        </button>
      </div>
    </div>
  );
};

export default PageNav;
