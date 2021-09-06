import React from 'react';

const ResultSummary = ({ totalRecords }) => {
  const noResults = (
    <React.Fragment>
      <span className="las la-frown text-danger"></span>
      No results found! Please try again with other search term...
    </React.Fragment>
  );
  const summary = (
    <React.Fragment>
      <span className="las la-smile text-success"></span>
      <span className="fw-bold">{totalRecords}</span> result(s) found!
    </React.Fragment>
  );

  return (
    <div id="search-result-summary">
      {totalRecords ? summary : noResults}
    </div>
  );
};

export default ResultSummary;
