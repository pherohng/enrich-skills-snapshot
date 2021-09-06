import React, { useRef, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import ValidateJS from 'validate.js';
import { RECAPTCHA_CONFIG } from '../../configs';
import { CHANGE_PASSWORD_FORM_CONFIG, CHANGE_PASSWORD_FORM_CONSTRAINS, RECAPTCHA_ERROR_MESSAGE } from '../../constants';
import FormInput from '../controls/FormInput';
import ReCAPTCHA from 'react-google-recaptcha';

const ChangePasswordForm = ({ reset, handleSubmit, cancelChangePasswordFormHandler, submitChangePasswordFormHandler }) => {
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
    cancelChangePasswordFormHandler();
  };

  const onChangePasswordFormSubmit = async (formValue) => {
    if (!isReCAPTCHAVerified) {
      setReCAPTCHAErrorMessage(RECAPTCHA_ERROR_MESSAGE);
      return;
    }

    try {
      await submitChangePasswordFormHandler(formValue);
    } catch (error) {
      reCAPTCHARef.current.reset();
      reset();
      setError(error);
    }
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

  const renderFormControls = () => {
    return Object.keys(CHANGE_PASSWORD_FORM_CONFIG).map(key => {
      const config = {
        id: key,
        type: CHANGE_PASSWORD_FORM_CONFIG[key].type,
        label: CHANGE_PASSWORD_FORM_CONFIG[key].label
      };

      return (
        <div key={key} className={CHANGE_PASSWORD_FORM_CONFIG[key].containerClassName}>
          <div className="mb-3">
            <Field name={key} component={FormInput} config={config} />
          </div>
        </div>
      );
    });
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
    <form noValidate={true} onSubmit={handleSubmit(onChangePasswordFormSubmit)}>
      {renderError()}

      <div className="form-text mb-3">
        <span>*</span> All fields are required
      </div>

      <div className="row">
        {renderFormControls()}
      </div>

      <div className="mt-5">
        <ReCAPTCHA
          ref={reCAPTCHARef}
          sitekey={RECAPTCHA_CONFIG.SITE_KEY}
          onChange={onReCAPTCHAChange}
          onExpired={onReCAPTCHAExpired}
        />
        {renderReCAPTCHAError()}
      </div>

      <div className="text-end form-action-buttons">
        <button type="button" className="btn btn-outline-light" onClick={onCancelButtonClick}>
          CANCEL
        </button>
        <button type="submit" className="btn btn-primary">
          SAVE
        </button>
      </div>
    </form>
  );
};

const validate = (formValue) => {
  const errors = {};

  const results = ValidateJS.validate(formValue, CHANGE_PASSWORD_FORM_CONSTRAINS, {
    format: 'detailed',
    fullMessages: false
  });

  if (results) {
    results.forEach(result => {
      errors[result.attribute] = result.error.replace('{label}', CHANGE_PASSWORD_FORM_CONFIG[result.attribute].label);
    });
  }

  return errors;
};

export default reduxForm({
  form: 'changePasswordForm',
  validate
})(ChangePasswordForm);
