import React from "react";
import PropTypes from "prop-types";

import loader from "../../images/loader.gif";
import WarningMsg from "../WarningMsg/WarningMsg";
import "./Loader.scss";

const LoaderComponent = props => {
  // If there was an error while loading the component
  if (props.error) {
    return <WarningMsg message="Sorry, there was a problem loading the page" />;
  }

  // Show Loading screen only if the component is taking more than 200ms to load
  if (props.pastDelay) {
    return (
      <div className="loader" style={props.style}>
        <img src={loader} alt="loading" />
      </div>
    );
  }

  return null;
};
LoaderComponent.propTypes = {
  error: PropTypes.bool,
  style: PropTypes.object,
  pastDelay: PropTypes.bool.isRequired
};

LoaderComponent.defaultProps = {
  error: false,
  style: {}
};

export default LoaderComponent;
