import React from 'react';
import PropTypes from 'prop-types';
import './DataNotFound.scss';

const DataNotFound = props => {
  const { name } = props;
  return (
    <div className="container data-not-found">
      <div className="row">
        <div className="col-11 p-0">
          <div className="jumbotron bg-transparent text-center m-0 d-flex flex-column justify-content-center">
            <span className="data-not-found-text">
              {name && `" No ${name} Found "`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

DataNotFound.propTypes = {
  name: PropTypes.string.isRequired
};

export default DataNotFound;
