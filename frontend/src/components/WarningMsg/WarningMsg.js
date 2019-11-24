import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_ERROR_MESSAGE } from '../../utils/errorMessages';

import './WarningMsg.scss';

const WarningMsg = props => (
  <div className="warning-message">{props.message}</div>
);

WarningMsg.propTypes = {
  message: PropTypes.string
};

WarningMsg.defaultProps = {
  message: DEFAULT_ERROR_MESSAGE
};

export default WarningMsg;
