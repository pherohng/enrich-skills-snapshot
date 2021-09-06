import React from 'react';
import { Link } from 'react-router-dom';
import { CONTENT_COL_CLASS_NAME } from '../../constants';

const Header = () => {
  return (
    <div id="site-header-container" className="container-fluid">
      <div className="row justify-content-center">
        <header id="site-header" className={`${CONTENT_COL_CLASS_NAME} d-flex justify-content-center`}>
          <Link to="/">
            <div id="logo">
              <h1>Snapshot</h1>
              <p className="site-subtitle">
                Enrich Skills to Succeed Mock Project
              </p>
            </div>
          </Link>
        </header>
      </div>
    </div>
  );
};

export default Header;
