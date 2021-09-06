import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { FORM_CONTENT_COL_CLASS_NAME } from '../constants';
import { generateRandomAvatar, isAuthenticated, signUp } from '../services';
import Avatar from './user-details/Avatar';
import SignUpForm from './auth/SignUpForm';

const SignUp = () => {
  const history = useHistory();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/');
    }
  }, [history]);

  useEffect(() => {
    generateRandomAvatarHandler();
  }, []);

  const generateRandomAvatarHandler = () => {
    const avatar = generateRandomAvatar();
    setAvatar(avatar);
  }

  const submitSignUpFormHandler = async (formValue) => {
    await trackPromise(signUp({
      ...formValue,
      avatar
    }));
    history.push('/signin');
  };

  return (
    <div id="sign-up-container" className="container-fluid">
      <div className="row justify-content-center">
        <section id="sign-up" className={FORM_CONTENT_COL_CLASS_NAME}>
          <div id="sign-up-form" className="card form-card">
            <div className="card-body">
              <h3 className="card-title form-title">SIGN UP</h3>

              <Avatar avatar={avatar} generateRandomAvatarHandler={generateRandomAvatarHandler} />

              <SignUpForm submitSignUpFormHandler={submitSignUpFormHandler} />

              <p className="mt-4 mb-0 text-center">
                <Link to="/signin" className="dotted-underline">
                  I'm already member
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
