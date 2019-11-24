import React from 'react';
import PropTypes from 'prop-types';
import loader from '../../images/loader.gif';
import './PageLoader.scss';
import WarningMsg from '../WarningMsg/WarningMsg';

const PageLoader = props => {
  // If there was an error while loading the component
  if (props.error) {
    return <WarningMsg message="Sorry, there was a problem loading the page" />;
  }
  // Show Loading screen only if the component is taking more than 200ms to load
  if (props.inProgress || props.pastDelay) {
    return (
      <div className="modal-wrapper">
        <div className="modal-backdrop">
          <div className="modal fade show" tabIndex="-1" role="dialog">
            <div className="loader">
              <img src={loader} alt="loading" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

PageLoader.propTypes = {
  inProgress: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.bool
};

PageLoader.defaultProps = {
  error: false,
  inProgress: true,
  pastDelay: false
};

export default PageLoader;
