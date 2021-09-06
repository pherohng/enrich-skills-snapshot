import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { VIEW_MODE } from '../constants';
import {
  changePassword,
  generateRandomAvatar,
  initButtonIconTooltips,
  isAuthenticated,
  saveUserDetails
} from '../services';
import { fetchUserDetails } from '../actions';
import Avatar from './user-details/Avatar';
import UserDetailsForm from './user-details/UserDetailsForm';
import ChangePasswordForm from './user-details/ChangePasswordForm';

const UserDetails = ({ userDetails, fetchUserDetails }) => {
  const history = useHistory();
  const [detailsViewMode, setDetailsViewMode] = useState(VIEW_MODE.DISABLED);
  const [passwordViewMode, setPasswordViewMode] = useState(VIEW_MODE.DISABLED);
  const [avatar, setAvatar] = useState(null);

  const editDetailsTooltipRef = useRef();
  const changePasswordTooltipRef = useRef();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/');
    }
  }, [history]);

  useEffect(() => {
    if (userDetails) {
      setAvatar(userDetails.avatar);
    }
  }, [userDetails]);

  useEffect(() => {
    const tooltips = initButtonIconTooltips([
      { ref: editDetailsTooltipRef, config: { title: 'Edit details' } },
      { ref: changePasswordTooltipRef, config: { title: 'Change password' } }
    ]);

    return () => {
      tooltips.forEach(item => item.hide());
    };
  });

  const onEditDetailsButtonClick = () => {
    setDetailsViewMode(VIEW_MODE.ENABLED);
  };

  const onChangePasswordButtonClick = () => {
    setPasswordViewMode(VIEW_MODE.ENABLED);
  };

  const generateRandomAvatarHandler = () => {
    const avatar = generateRandomAvatar();
    setAvatar(avatar);
  };

  const cancelUserDetailsFormHandler = () => {
    setDetailsViewMode(VIEW_MODE.DISABLED);
  };

  const submitUserDetailsFormHandler = async (formValue) => {
    await trackPromise(saveUserDetails(userDetails.uid, {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      avatar
    }));
    fetchUserDetails(userDetails.uid);
    setDetailsViewMode(VIEW_MODE.DISABLED);
  };

  const cancelChangePasswordFormHandler = () => {
    setPasswordViewMode(VIEW_MODE.DISABLED);
  };

  const submitChangePasswordFormHandler = async (formValue) => {
    await trackPromise(changePassword({
      currentPassword: formValue.currentPassword,
      password: formValue.password
    }));
    setPasswordViewMode(VIEW_MODE.DISABLED);
  };

  const renderChangePasswordSection = () => {
    if (passwordViewMode === VIEW_MODE.DISABLED) {
      return null;
    }

    return (
      <React.Fragment>
        <h4 className="form-title sub-form-title">CHANGE PASSWORD</h4>

        <ChangePasswordForm
          cancelChangePasswordFormHandler={cancelChangePasswordFormHandler}
          submitChangePasswordFormHandler={submitChangePasswordFormHandler}
        />
      </React.Fragment>
    );
  };

  const renderActionButtons = () => {
    if (!userDetails || detailsViewMode === VIEW_MODE.ENABLED || passwordViewMode === VIEW_MODE.ENABLED) {
      return null;
    }

    return (
      <div className="text-end">
        <button
          className="btn btn-link btn-icon action-button"
          onClick={onEditDetailsButtonClick}
          ref={editDetailsTooltipRef}
        >
          <span className="las la-pen-fancy"></span>
        </button>

        <button
          className="btn btn-link btn-icon action-button"
          onClick={onChangePasswordButtonClick}
          ref={changePasswordTooltipRef}
        >
          <span className="las la-key"></span>
        </button>
      </div>
    );
  };

  return (
    <div id="user-details-container" className="container-fluid">
      <div className="row justify-content-center">
        <section id="user-details" className="col-8 col-lg-6 col-xxl-4">
          <div id="user-details-form" className="card form-card">
            <div className="card-header">
              <div className="decoration"></div>
            </div>
            <div className="card-body">
              {renderActionButtons()}

              <div className="row justify-content-center">
                <div className="col-8 col-md-6 col-lg-4">
                  <Avatar avatar={avatar} viewMode={detailsViewMode} generateRandomAvatarHandler={generateRandomAvatarHandler} />
                </div>

                <div className="col-md-10 col-lg-8">
                  <UserDetailsForm
                    initialValues={userDetails}
                    viewMode={detailsViewMode}
                    cancelUserDetailsFormHandler={cancelUserDetailsFormHandler}
                    submitUserDetailsFormHandler={submitUserDetailsFormHandler}
                  />

                  {renderChangePasswordSection()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  };
};

export default connect(
  mapStateToProps, {
    fetchUserDetails
  }
)(UserDetails);
