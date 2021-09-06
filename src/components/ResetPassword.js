import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import qs from 'query-string';
import { trackPromise } from 'react-promise-tracker';
import { FORM_CONTENT_COL_CLASS_NAME, PASSWORD_RESET_SUCCESSFULLY_MESSAGE } from '../constants';
import { resetPassword, verifyPasswordResetCode } from '../services';
import ResetPasswordForm from './auth/ResetPasswordForm';

const ResetPassword = () => {
  const history = useHistory();
  const [oobCode, setOOBCode] = useState(null);
  const [email, setEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const queryParams = qs.parse(history.location.search);
    const oobCode = queryParams.oobCode;

    trackPromise(verifyPasswordResetCode(oobCode))
      .then((response) => {
        setOOBCode(oobCode);
        setEmail(response);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [history]);

  const submitResetPasswordFormHandler = async (formValue) => {
    await trackPromise(resetPassword(oobCode, formValue.password));
    setSuccessMessage(PASSWORD_RESET_SUCCESSFULLY_MESSAGE);
  };

  const renderResetPasswordForm = () => {
    if (errorMessage || successMessage || !(oobCode && email)) {
      return null;
    }

    return (
      <ResetPasswordForm initialValues={{ email }} submitResetPasswordFormHandler={submitResetPasswordFormHandler} />
    );
  }

  const renderSuccessMessage = () => {
    if (!successMessage) {
      return null;
    }

    return (
      <div className="alert alert-info" role="alert">
        {successMessage}
      </div>
    );
  }

  const renderErrorMessage = () => {
    if (!errorMessage) {
      return null;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  }

  return (
    <div id="reset-password-container" className="container-fluid">
      <div className="row justify-content-center">
        <section id="reset-password" className={FORM_CONTENT_COL_CLASS_NAME}>
          <div id="reset-password-form" className="card form-card">
            <div className="card-body">
              <h3 className="card-title form-title">RESET PASSWORD</h3>

              {renderErrorMessage()}
              {renderSuccessMessage()}
              {renderResetPasswordForm()}

              <p className="mt-4 mb-0 d-flex justify-content-between">
                <Link to="/signin" className="dotted-underline">
                  I'm already member
                </Link>
                <Link to="/signup" className="dotted-underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResetPassword;
