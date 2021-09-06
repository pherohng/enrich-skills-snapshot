import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { FORM_CONTENT_COL_CLASS_NAME, PASSWORD_RESET_EMAIL_SENT_MESSAGE } from '../constants';
import { isAuthenticated, sendPasswordResetEmail } from '../services';
import ForgotPasswordForm from './auth/ForgotPasswordForm';

const ForgotPassword = () => {
  const history = useHistory();
  const [emailSentMessage, setEmailSentMessage] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/');
    }
  }, [history]);

  const submitForgotPasswordFormHandler = async (formValue) => {
    await trackPromise(sendPasswordResetEmail(formValue.email));
    setEmailSentMessage(PASSWORD_RESET_EMAIL_SENT_MESSAGE);
  };

  const renderForgotPasswordForm = () => {
    if (emailSentMessage) {
      return null;
    }

    return (
      <ForgotPasswordForm submitForgotPasswordFormHandler={submitForgotPasswordFormHandler} />
    );
  };

  const renderEmailSentMessage = () => {
    if (!emailSentMessage) {
      return null;
    }

    return (
      <div className="alert alert-info" role="alert">
        {emailSentMessage}
      </div>
    );
  };

  return (
    <div id="forgot-password-container" className="container-fluid">
      <div className="row justify-content-center">
        <section id="forgot-password" className={FORM_CONTENT_COL_CLASS_NAME}>
          <div id="forgot-password-form" className="card form-card">
            <div className="card-body">
              <h3 className="card-title form-title">FORGOT PASSWORD</h3>

              {renderEmailSentMessage()}
              {renderForgotPasswordForm()}

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

export default ForgotPassword;
