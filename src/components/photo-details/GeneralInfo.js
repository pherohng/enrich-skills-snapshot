import React from 'react';
import PhotoDetailsFact from './PhotoDetailsFact';

const GeneralInfo = ({ generalInfo }) => {
  const getNullableContent = (content) => {
    if (content === undefined || content === null || content === '') {
      return '-';
    }

    return content;
  };

  const getPublishedDateContent = (publishedDate) => {
    const date = new Date(publishedDate);

    return Intl.DateTimeFormat('en', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getLocationContent = (location) => {
    const { title, position } = location;

    if (!title) {
      return '-';
    }

    return (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${position.latitude},${position.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="location-link"
      >
        {title}
        <span className="las la-external-link-alt"></span>
      </a>
    );
  };

  const getConfig = (key) => {
    switch (key) {
      case 'user':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: 'la-user',
          title: 'USER',
          content: getNullableContent(generalInfo.user.name)
        };
      case 'publishedDate':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: 'la-calendar',
          title: 'PUBLISHED',
          content: getPublishedDateContent(generalInfo.publishedDate)
        };
      case 'location':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: 'la-map-marker-alt',
          title: 'LOCATION',
          content: getLocationContent(generalInfo.location)
        };
      case 'viewCount':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: 'la-eye',
          title: 'VIEWS',
          content: getNullableContent(generalInfo.viewCount)
        };
      case 'likeCount':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: 'la-thumbs-up',
          title: 'LIKES',
          content: getNullableContent(generalInfo.likeCount)
        };
      case 'downloadCount':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: 'la-download',
          title: 'DOWNLOADS',
          content: getNullableContent(generalInfo.downloadCount)
        };
      case 'description':
        return {
          containerClassName: 'col-12',
          iconClassName: 'la-align-left',
          title: 'DESCRIPTION',
          content: getNullableContent(generalInfo.description)
        };
      default:
        return null;
    }
  };

  const renderContent = () => {
    return Object.keys(generalInfo).map(key => {
      const config = getConfig(key);
      return config ? <PhotoDetailsFact key={key} {...config} /> : null;
    });
  };

  return (
    <React.Fragment>
      <p className="photo-details-section">
        General Info
      </p>

      <div className="row">
        {renderContent()}
      </div>
    </React.Fragment>
  );
};

export default GeneralInfo;
