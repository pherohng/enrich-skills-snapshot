import React, { useRef, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import ValidateJS from 'validate.js';
import { RECAPTCHA_CONFIG } from '../../configs';
import {
  RECAPTCHA_ERROR_MESSAGE,
  RESET_PASSWORD_FORM_CONFIG,
  RESET_PASSWORD_FORM_CONSTRAINS,
  RESET_PASSWORD_FORM_KEY
} from '../../constants';
import FormInput from '../controls/FormInput';

const ResetPasswordForm = ({ initialValues, change, untouch, handleSubmit, submitResetPasswordFormHandler }) => {
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

  const onResetPasswordFormSubmit = async (formValue) => {
    if (!isReCAPTCHAVerified) {
      setReCAPTCHAErrorMessage(RECAPTCHA_ERROR_MESSAGE);
      return;
    }

    try {
      await submitResetPasswordFormHandler(formValue);
    } catch (error) {
      reCAPTCHARef.current.reset();

      change('password', null);
      change('confirmPassword', null);
      untouch('password', 'confirmPassword');

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
    return Object.keys(RESET_PASSWORD_FORM_CONFIG).map(key => {
      const config = {
        id: key,
        type: RESET_PASSWORD_FORM_CONFIG[key].type,
        label: RESET_PASSWORD_FORM_CONFIG[key].label,
        disabled: key === RESET_PASSWORD_FORM_KEY.email
      };

      return (
        <div key={key} className={RESET_PASSWORD_FORM_CONFIG[key].containerClassName}>
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
    <form noValidate={true} onSubmit={handleSubmit(onResetPasswordFormSubmit)}>
      {renderError()}

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
        <button type="submit" className="btn btn-primary">
          RESET PASSWORD
        </button>
      </div>
    </form>
  );
};

const validate = (formValue) => {
  const errors = {};

  const results = ValidateJS.validate(formValue, RESET_PASSWORD_FORM_CONSTRAINS, {
    format: 'detailed',
    fullMessages: false
  });

  if (results) {
    results.forEach(result => {
      errors[result.attribute] = result.error.replace('{label}', RESET_PASSWORD_FORM_CONFIG[result.attribute].label);
    });
  }

  return errors;
};

export default reduxForm({
  form: 'resetPasswordForm',
  validate
})(ResetPasswordForm);
