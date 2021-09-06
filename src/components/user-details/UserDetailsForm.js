import React, { useRef, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import ValidateJS from 'validate.js';
import { RECAPTCHA_CONFIG } from '../../configs';
import {
  RECAPTCHA_ERROR_MESSAGE,
  USER_DETAILS_FORM_CONFIG,
  USER_DETAILS_FORM_CONSTRAINS,
  USER_DETAILS_FORM_KEY,
  VIEW_MODE
} from '../../constants';
import FormInput from '../controls/FormInput';
import ReCAPTCHA from 'react-google-recaptcha';

const UserDetailsForm = ({ viewMode, reset, handleSubmit, cancelUserDetailsFormHandler, submitUserDetailsFormHandler }) => {
  const [isReCAPTCHAVerified, setIsReCAPTCHAVerified] = useState(false);
  const [reCAPTCHAErrorMessage, setReCAPTCHAErrorMessage] = useState(null);
  const [error, setError] = useState(null);

  const reCAPTCHARef = useRef();

  const onReCAPTCHAChange = (token) => {
    setIsReCAPTCHAVerified(true);
    setReCAPTCHAErrorMessage(null);
  };

  const onReCAPTCHAExpired = () => {
    setReCAPTCHAErrorMessage(RECAPTCHA_ERROR_MESSAGE);
  };

  const onCancelButtonClick = () => {
    reset();
    cancelUserDetailsFormHandler();
  };

  const onUserDetailsFormSubmit = async (formValue) => {
    if (!isReCAPTCHAVerified) {
      setReCAPTCHAErrorMessage(RECAPTCHA_ERROR_MESSAGE);
      return;
    }

    try {
      await submitUserDetailsFormHandler(formValue);
    } catch (error) {
      reCAPTCHARef.current.reset();
      setError(error);
    }
  };

  const renderFormActionButtons = () => {
    if (viewMode === VIEW_MODE.DISABLED) {
      return null;
    }

    return (
      <div className="text-end form-action-buttons">
        <button type="button" className="btn btn-outline-light" onClick={onCancelButtonClick}>
          CANCEL
        </button>
        <button type="submit" className="btn btn-primary">
          SAVE
        </button>
      </div>
    );
  };

  const renderReCAPTCHAError = () => {
    if (!reCAPTCHAErrorMessage) {
      return null;
    }

    return (
      <div className="invalid-feedback recaptcha-error-message">
        {reCAPTCHAErrorMessage}
      </div>
    );
  };

  const renderReCAPTCHA = () => {
    if (viewMode === VIEW_MODE.DISABLED) {
      return null;
    }

    return (
      <div className="mt-5">
        <ReCAPTCHA
          ref={reCAPTCHARef}
          sitekey={RECAPTCHA_CONFIG.SITE_KEY}
          onChange={onReCAPTCHAChange}
          onExpired={onReCAPTCHAExpired}
        />
        {renderReCAPTCHAError()}
      </div>
    );
  };

  const renderFormControls = () => {
    return Object.keys(USER_DETAILS_FORM_CONFIG).map(key => {
      const config = {
        id: key,
        type: USER_DETAILS_FORM_CONFIG[key].type,
        label: USER_DETAILS_FORM_CONFIG[key].label,
        disabled: key === USER_DETAILS_FORM_KEY.email || viewMode === VIEW_MODE.DISABLED
      };

      return (
        <div key={key} className={USER_DETAILS_FORM_CONFIG[key].containerClassName}>
          <div className="mb-3">
            <Field name={key} component={FormInput} config={config} />
          </div>
        </div>
      );
    });
  };

  const renderHint = () => {
    if (viewMode === VIEW_MODE.DISABLED) {
      return null;
    }

    return (
      <div className="form-text mb-3">
        <span>*</span> All fields are required
      </div>
    );
  };

  const renderError = () => {
    if  (!error) {
      return null;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {error.message}
      </div>
    );
  };

  return (
    <form noValidate={true} onSubmit={handleSubmit(onUserDetailsFormSubmit)}>
      {renderError()}

      {renderHint()}

      <div className="row">
        {renderFormControls()}
      </div>

      {renderReCAPTCHA()}

      {renderFormActionButtons()}
    </form>
  );
};

const validate = (formValue) => {
  const errors = {};

  const results = ValidateJS.validate(formValue, USER_DETAILS_FORM_CONSTRAINS, {
    format: 'detailed',
    fullMessages: false
  });

  if (results) {
    results.forEach(result => {
      errors[result.attribute] = result.error.replace('{label}', USER_DETAILS_FORM_CONFIG[result.attribute].label);
    });
  }

  return errors;
};

export default reduxForm({
  form: 'userDetailsForm',
  enableReinitialize: true,
  validate
})(UserDetailsForm);
