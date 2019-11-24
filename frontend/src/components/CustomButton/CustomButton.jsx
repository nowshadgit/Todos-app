import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ButtonLoader from '../ButtonLoader/ButtonLoader';

const CustomButton = props => {
  const {
    disabled,
    isLoading,
    submitFunction,
    text,
    id,
    type,
    className,
    isBlock
  } = props;
  const isDisabled = disabled || isLoading;
  return (
    <div className="">
      <Button
        block={isBlock}
        id={id}
        type={type}
        className={className}
        disabled={isDisabled}
        onClick={eve => submitFunction(eve)}
      >
        {isLoading && <ButtonLoader />}
        {!isLoading && text}
      </Button>
    </div>
  );
};

CustomButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  submitFunction: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  isBlock: PropTypes.bool.isRequired
};

export default CustomButton;
