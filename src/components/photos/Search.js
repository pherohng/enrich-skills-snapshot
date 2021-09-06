import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { CONTENT_COL_CLASS_NAME } from '../../constants';
import { changeQueryParams } from '../../actions';
import SearchTermInputGroup from './SearchTermInputGroup';
import Filters from './Filters';

const Search = ({ handleSubmit, reset, changeQueryParams }) => {
  const onSearchFormSubmit = (formValue) => {
    const queryParams = {
      ...formValue,
      page: 1
    };

    changeQueryParams(queryParams);
  };

  return (
    <div id="search-section-container" className="container-fluid jumbotron">
      <div className="row justify-content-center">
        <section id="search-section" className={CONTENT_COL_CLASS_NAME}>
          <form onSubmit={handleSubmit(onSearchFormSubmit)}>
            <Field name="query" component={SearchTermInputGroup} onResetButtonClick={reset} />
            <Filters />
          </form>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialValues: {
      query: state.queryParams.query,
      contentFilter: state.queryParams.contentFilter,
      orientation: state.queryParams.orientation || '',
      color: state.queryParams.color || ''
    }
  };
}

export default compose(
  connect(
    mapStateToProps,
    { changeQueryParams }
  ),
  reduxForm({ form: 'searchForm' })
)(Search);
