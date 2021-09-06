import React from 'react';

const FormRadioInline = ({ config, input }) => {
  return (
    <div className="form-check form-check-inline">
      <input type="radio" id={config.id} className="form-check-input" {...input} />
      <label htmlFor={config.id} className="form-check-label">
        {config.label}
      </label>
    </div>
  );
};

export default FormRadioInline;
