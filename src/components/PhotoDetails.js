import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { manuallyIncrementPromiseCounter } from 'react-promise-tracker';
import { CONTENT_COL_CLASS_NAME } from '../constants';
import { fetchPhotoDetails } from '../actions';
import PhotoDetailsFact from './photo-details/PhotoDetailsFact';
import GeneralInfo from './photo-details/GeneralInfo';
import ExifInfo from './photo-details/ExifInfo';
import ZoomablePhoto from './photo-details/ZoomablePhoto';

const PhotoDetails = ({ match, photoDetails, fetchPhotoDetails }) => {
  const id = match.params.id;

  useEffect(() => {
    manuallyIncrementPromiseCounter(); // Add extra loading state for <img> in ZoomablePhoto
    fetchPhotoDetails(id);

    return fetchPhotoDetails(null);
  }, [id, fetchPhotoDetails]);

  const getGeneralInfo = () => {
    const {
      user,
      created_at: publishedDate,
      location,
      views: viewCount,
      likes: likeCount,
      downloads: downloadCount
    } = photoDetails;

    return {
      user,
      publishedDate,
      location,
      viewCount,
      likeCount,
      downloadCount
    };
  };

  const getExifInfo = () => {
    const {
      make,
      model,
      focal_length: focalLength,
      aperture,
      exposure_time: exposureTime,
      iso
    } = photoDetails.exif;

    return {
      make,
      model,
      focalLength,
      aperture,
      exposureTime,
      iso
    };
  };

  const renderContent = () => {
    if (!photoDetails) {
      return null;
    }

    const generalInfo = getGeneralInfo();
    const exifInfo = getExifInfo();

    return (
      <React.Fragment>
        <div id="photo-details-container" className="container-fluid jumbotron">
          <div className="row justify-content-center">
            <section id="photo-details" className={CONTENT_COL_CLASS_NAME}>
              <div className="row">
                <div className="col-lg-6">
                  <GeneralInfo generalInfo={generalInfo} />
                </div>
                <div className="col-lg-6">
                  <ExifInfo exifInfo={exifInfo} />
                </div>
                <div className="col-12">
                  <PhotoDetailsFact iconClassName="la-align-left" title="DESCRIPTION" content={photoDetails.description || '-'} />
                </div>
              </div>
            </section>
          </div>
        </div>

        <ZoomablePhoto photoDetails={photoDetails} />
      </React.Fragment>
    );
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return {
    photoDetails: state.photoDetails
  };
};

export default connect(
  mapStateToProps,
  { fetchPhotoDetails }
)(PhotoDetails);
