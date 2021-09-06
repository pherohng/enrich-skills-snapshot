import React from 'react';
import { Link } from 'react-router-dom';
import Gallery from 'react-photo-gallery';

const PhotoGrid = ({ photos }) => {
  const renderImage = ({ key, index, photo, margin, onClick }) => {
    const containerStyle = {
      margin,
      width: photo.width,
      height: photo.height
    };

    return (
      <figure
        key={key}
        className="photo-container"
        style={{ ...containerStyle }}
      >
        <Link to={`/photos/${photo.id}`}>
          <img
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
          />
        </Link>
      </figure>
    );
  };

  return (
    <div id="photo-grid">
      <Gallery photos={photos} renderImage={renderImage} margin={5} />
    </div>
  );
};

export default PhotoGrid;
