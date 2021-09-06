import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrismaZoom from 'react-prismazoom';
import { manuallyDecrementPromiseCounter } from 'react-promise-tracker';
import { CONTENT_COL_CLASS_NAME } from '../../constants';
import { initButtonIconTooltips } from '../../services';

const ZoomablePhoto = ({ photoDetails }) => {
  const history = useHistory();
  const [zoomLevel, setZoomLevel] = useState(1);

  const photoRef = useRef();

  const backTooltipRef = useRef();
  const zoomInTooltipRef = useRef();
  const zoomOutTooltipRef = useRef();
  const zoomResetTooltipRef = useRef();
  const downloadTooltipRef = useRef();

  useEffect(() => {
    const tooltips = initButtonIconTooltips([
      { ref: backTooltipRef, config: { title: 'Go back' } },
      { ref: zoomInTooltipRef, config: { title: 'Zoom in' } },
      { ref: zoomOutTooltipRef, config: { title: 'Zoom out' } },
      { ref: zoomResetTooltipRef, config: { title: 'Reset' } },
      { ref: downloadTooltipRef, config: { title: 'Download' } }
    ]);

    return () => {
      tooltips.forEach(item => item.hide());
    };
  });

  const onGoBackButtonClick = () => {
    history.goBack();
  };

  const onZoomInButtonClick = () => {
    photoRef.current.zoomIn(1);
  };

  const onZoomOutButtonClick = () => {
    photoRef.current.zoomOut(1);
  };

  const onResetZoomLevelButtonClick = () => {
    photoRef.current.reset();
  };

  return (
    <div id="zoomable-photo-container" className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-6 col-lg-5 col-xxl-auto d-flex flex-xxl-column">
          <button
            className="btn btn-link btn-icon action-button"
            onClick={onGoBackButtonClick}
            disabled={history.length === 1}
            ref={backTooltipRef}
          >
            <span className="las la-arrow-left"></span>
          </button>
        </div>

        <div className="col-6 col-lg-5 col-xxl-auto order-xxl-2 d-flex flex-xxl-column justify-content-end justify-content-xxl-start">
          <button
            className="btn btn-link btn-icon action-button"
            onClick={onZoomInButtonClick}
            disabled={zoomLevel === 5}
            ref={zoomInTooltipRef}
          >
            <span className="las la-search-plus"></span>
          </button>
          <button
            className="btn btn-link btn-icon action-button"
            onClick={onZoomOutButtonClick}
            disabled={zoomLevel === 1}
            ref={zoomOutTooltipRef}
          >
            <span className="las la-search-minus"></span>
          </button>
          <button
            className="btn btn-link btn-icon action-button"
            onClick={onResetZoomLevelButtonClick}
            disabled={zoomLevel === 1}
            ref={zoomResetTooltipRef}
          >
            <span className="las la-expand"></span>
          </button>

          <button className="btn btn-link btn-icon d-block d-xxl-none" disabled={true}>
            <span className="las la-ellipsis-v"></span>
          </button>
          <button className="btn btn-link btn-icon d-none d-xxl-block" disabled={true}>
            <span className="las la-ellipsis-h"></span>
          </button>

          <a
            href={`${photoDetails.links.download}?force=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-icon action-button"
            download
            ref={downloadTooltipRef}
          >
            <span className="las la-download"></span>
          </a>
        </div>

        <section id="zoomable-photo" className={`${CONTENT_COL_CLASS_NAME} order-xxl-1`}>
          <div className="photo-frame">
            <PrismaZoom ref={photoRef} onZoomChange={(zoomLevel) => setZoomLevel(zoomLevel)}>
              <figure>
                <img
                  src={photoDetails.urls.full}
                  alt={photoDetails.alt_description}
                  onLoad={() => manuallyDecrementPromiseCounter()}
                />
              </figure>
            </PrismaZoom>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ZoomablePhoto;
