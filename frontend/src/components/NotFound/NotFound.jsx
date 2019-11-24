import React from "react";
import PropTypes from "prop-types";

import "./NotFound.scss";
import "../../styles/todosApp.scss";
import ErrorImg from "../../images/error.png";

const NotFound = props => (
  <div className="error-bg">
    <div className="error-txt">Sorry, we can’t find that page.</div>
    <div className="error-txt1">
      Please try retyping the address or just head back to our home page.
    </div>
    <div className="error-img">
      <img src={ErrorImg} alt="Page Not Found" />
    </div>
    <div className="btn-home">
      <button className="btn btn-light" onClick={props.changeHandler}>
        Go home
      </button>
    </div>
  </div>
);

NotFound.propTypes = {
  changeHandler: PropTypes.func
};

NotFound.defaultProps = {
  changeHandler: () => {}
};

export default NotFound;
