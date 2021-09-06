import React from 'react';

const PhotoDetailsFact = ({ containerClassName, iconClassName, title, content }) => {
  const className = containerClassName
    ? `${containerClassName} photo-details-fact`
    : `photo-details-fact`;
  const icon = iconClassName
    ? <span className={`las ${iconClassName}`}></span>
    : null;

  return (
    <div className={className}>
      <p className="photo-details-fact-label">
        {icon}
        {title}
      </p>
      {content}
    </div>
  );
};

export default PhotoDetailsFact;
