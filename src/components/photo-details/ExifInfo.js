import React from 'react';
import PhotoDetailsFact from './PhotoDetailsFact';

const ExifInfo = ({ exifInfo }) => {
  const getNullableContent = (content) => {
    if (content === undefined || content === null || content === '') {
      return '-';
    }

    return content;
  };

  const getFocalLengthContent = (focalLength) => {
    if (!focalLength) {
      return '-';
    }

    return `${focalLength}mm`;
  };

  const getApertureContent = (aperture) => {
    if (!aperture) {
      return '-';
    }

    return `f/${aperture}`;
  };

  const getExposureTimeContent = (exposureTime) => {
    if (!exposureTime) {
      return '-';
    }

    return `${exposureTime}s`;
  };

  const getConfig = (key) => {
    switch (key) {
      case 'make':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: null,
          title: 'CAMERA MAKE',
          content: getNullableContent(exifInfo.make)
        };
      case 'model':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: null,
          title: 'CAMERA MODEL',
          content: getNullableContent(exifInfo.model)
        };
      case 'focalLength':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: null,
          title: 'FOCAL LENGTH',
          content: getFocalLengthContent(exifInfo.focalLength)
        };
      case 'aperture':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: null,
          title: 'APERTURE',
          content: getApertureContent(exifInfo.aperture)
        };
      case 'exposureTime':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: null,
          title: 'SHUTTER SPEED',
          content: getExposureTimeContent(exifInfo.exposureTime)
        };
      case 'iso':
        return {
          containerClassName: 'col-lg-4',
          iconClassName: null,
          title: 'ISO',
          content: getNullableContent(exifInfo.iso)
        };
      default:
        return null;
    }
  };

  const renderContent = () => {
    return Object.keys(exifInfo).map(key => {
      const config = getConfig(key);
      return config ? <PhotoDetailsFact key={key} {...config} /> : null;
    });
  };

  return (
    <React.Fragment>
      <p className="photo-details-section">
        Exif Info
      </p>

      <div className="row">
        {renderContent()}
      </div>
    </React.Fragment>
  );
};

export default ExifInfo;
