import React from 'react';
import PropTypes from 'prop-types';

const DisplayErrors = props => {
  const errorKeys = props.errors && Object.keys(props.errors);

  const getMergedArray = errorObject => {
    let result = [];

    let mergedErrors = [];
    // eslint-disable-next-line no-unused-vars
    for (const errors of Object.values(errorObject)) {
      mergedErrors = mergedErrors.concat(errors);
    }
    result = mergedErrors;

    return result;
  };

  let component = null;
  if (errorKeys && errorKeys.length > 0) {
    const errors = getMergedArray(props.errors);

    const singleError = (
      <div className="col-12" key="formErrors">
        <div>{errors[0]}</div>
      </div>
    );

    const multipleErrors = (
      <div className="col-12" key="formErrors">
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );

    component = Boolean(errors.length) && (
      <div className="row text-left text-danger mb-3 " id="error">
        {errors.length === 1 ? singleError : multipleErrors}
      </div>
    );
  }

  return component;
};

DisplayErrors.propTypes = {
  errors: PropTypes.object
};

DisplayErrors.defaultProps = {
  displayHeader: true
};

export default DisplayErrors;
