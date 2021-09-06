import React from 'react';

const FormInput = ({ config, input, meta }) => {
  const getInputClassName = ({ touched, valid }) => {
    if (!touched || valid) {
      return 'form-control';
    }

    return 'form-control is-invalid';
  };

  const renderError = ({ touched, invalid, error }) => {
    if (touched && invalid) {
      return (
        <div className="invalid-feedback">
          {error}
        </div>
      );
    }

    return null;
  };

  return (
    <React.Fragment>
      <label htmlFor={config.id} className="form-label">
        {config.label}
      </label>
      <input type={config.type} id={config.id} className={getInputClassName(meta)} {...input} disabled={config.disabled} />

      {renderError(meta)}
    </React.Fragment>
  );
};

export default FormInput;
