import React, { useRef, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import ValidateJS from 'validate.js';
import { RECAPTCHA_CONFIG } from '../../configs';
import { RECAPTCHA_ERROR_MESSAGE, SIGN_IN_FORM_CONFIG, SIGN_IN_FORM_CONSTRAINS } from '../../constants';
import FormInput from '../controls/FormInput';

const SignInForm = ({ change, untouch, handleSubmit, submitSignInFormHandler }) => {
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

  const onSignInFormSubmit = async (formValue) => {
    if (!isReCAPTCHAVerified) {
      setReCAPTCHAErrorMessage(RECAPTCHA_ERROR_MESSAGE);
      return;
    }

    try {
      await submitSignInFormHandler(formValue);
    } catch (error) {
      reCAPTCHARef.current.reset();

      change('password', null);
      untouch('password');

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
    return Object.keys(SIGN_IN_FORM_CONFIG).map(key => {
      const config = {
        id: key,
        type: SIGN_IN_FORM_CONFIG[key].type,
        label: SIGN_IN_FORM_CONFIG[key].label
      };

      return (
        <div key={key} className={SIGN_IN_FORM_CONFIG[key].containerClassName}>
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
    <form noValidate={true} onSubmit={handleSubmit(onSignInFormSubmit)}>
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
          LET'S GO
        </button>
      </div>
    </form>
  );
};

const validate = (formValue) => {
  const errors = {};

  const results = ValidateJS.validate(formValue, SIGN_IN_FORM_CONSTRAINS, {
    format: 'detailed',
    fullMessages: false
  });

  if (results) {
    results.forEach(result => {
      errors[result.attribute] = result.error.replace('{label}', SIGN_IN_FORM_CONFIG[result.attribute].label);
    });
  }

  return errors;
};

export default reduxForm({
  form: 'signInForm',
  validate
})(SignInForm);
