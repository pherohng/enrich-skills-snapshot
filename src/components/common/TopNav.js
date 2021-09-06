import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { CONTENT_COL_CLASS_NAME } from '../../constants';
import { signOut } from '../../services';

const TopNav = ({ userDetails }) => {
  const onSignOutButtonClick = async () => {
    await trackPromise(signOut());
  };

  const renderLinks = () => {
    if (!userDetails) {
      return (
        <React.Fragment>
          <Link to="/signin" className="dotted-underline sign-in-link">
            <span className="las la-sign-in-alt"></span>
            Sign In
          </Link>
          <Link to="/signup" className="dotted-underline sign-up-link">
            <span className="las la-user"></span>
            Sign Up
          </Link>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link to="/my-account" className="dotted-underline account-link">
          <img src={userDetails.avatar} alt="Avatar" />
          {`${userDetails.firstName} ${userDetails.lastName}`}
        </Link>
        <button type="button" className="btn dotted-underline" onClick={onSignOutButtonClick}>
          <span className="las la-sign-out-alt"></span>
          Sign Out
        </button>
      </React.Fragment>
    );
  }

  return (
    <div id="top-nav-container" className="container-fluid">
      <div className="row justify-content-center">
        <nav id="top-nav" className={`${CONTENT_COL_CLASS_NAME} px-0 d-flex justify-content-end align-items-center`}>
          {renderLinks()}
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  };
};

export default connect(mapStateToProps)(TopNav);
