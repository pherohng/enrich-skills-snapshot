import React from 'react';
import { VIEW_MODE } from '../../constants';

const Avatar = ({ avatar, viewMode, generateRandomAvatarHandler }) => {
  const renderActionButtons = () => {
    if (viewMode === VIEW_MODE.DISABLED) {
      return null;
    }

    return (
      <button type="button" className="btn btn-link" onClick={() => generateRandomAvatarHandler()}>
        <span className="las la-random"></span>
        Generate random avatar
      </button>
    );
  };

  const renderContent = () => {
    if (!avatar) {
      return null;
    }

    return (
      <div className="avatar-generator">
        <figure className="avatar">
          <img src={avatar} alt="Avatar" />
        </figure>

        {renderActionButtons()}
      </div>
    );
  };

  return renderContent();
};

export default Avatar;
