import React from 'react';
import { Field } from 'redux-form';
import { FILTER_FORM_CONTROLS_CONFIG } from '../../constants';
import FormRadioInline from '../controls/FormRadioInline';

const Filters = () => {
  const renderRadioFilters = (formControlName, source) => {
    return source.map((item) => {
      const config = {
        id: item.id,
        label: item.name
      };

      return (
        <Field key={item.id} name={formControlName} component={FormRadioInline} type="radio" value={item.value} config={config} />
      );
    });
  };

  const renderFilters = () => {
    return Object.keys(FILTER_FORM_CONTROLS_CONFIG).map((key, index, source) => {
      return (
        <div key={key} className={`row justify-content-center`}>
          <div className="col-lg-2">
            <p className="filter-label">{FILTER_FORM_CONTROLS_CONFIG[key].label}</p>
          </div>
          <div className="col-lg-10">
            <div className={index !== source.length - 1 ? 'mb-3' : ''}>
              {renderRadioFilters(key, FILTER_FORM_CONTROLS_CONFIG[key].source)}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div id="filters" className="collapse">
      {renderFilters()}
    </div>
  );
};

export default Filters;
