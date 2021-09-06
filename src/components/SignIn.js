import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { FORM_CONTENT_COL_CLASS_NAME } from '../constants';
import { isAuthenticated, signIn } from '../services';
import SignInForm from './auth/SignInForm';

const SignIn = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/');
    }
  }, [history]);

  const submitSignInFormHandler = async (formValue) => {
    await trackPromise(signIn(formValue));
  };

  return (
    <div id="sign-in-container" className="container-fluid">
      <div className="row justify-content-center">
        <section id="sign-in" className={FORM_CONTENT_COL_CLASS_NAME}>
          <div id="sign-in-form" className="card form-card">
            <div className="card-body">
              <h3 className="card-title form-title">SIGN IN</h3>

              <SignInForm submitSignInFormHandler={submitSignInFormHandler} />

              <p className="mt-4 mb-0 d-flex justify-content-between">
                <Link to="/forgot-password" className="dotted-underline">
                  Forgot password
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

export default SignIn;
