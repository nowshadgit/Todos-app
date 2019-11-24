import React from 'react';
import { InputGroup, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DisplayErrors from '../DisplayErrors';
import { SUBMIT } from '../../utils/constants';
import CustomButton from '../CustomButton/CustomButton';

const AddEditTodoForm = props => {
  return (
    <div className="card-text text-left">
      <div className="card p-3">
        <form autoComplete="off">
          <DisplayErrors errors={props.formErrors} />
          <div className="row mb-4">
            <div className="col col-6 ml-0">
            <FormLabel>Name</FormLabel>
              <InputGroup size="sm">
                <FormControl
                  type="text"
                  id={props.todoTitleId}
                  value={props.todoTitleValue}
                  name={props.todoTitleId}
                  onChange={props.handleChange}
                />
              </InputGroup>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col col-6 ml-0">
              <FormLabel> Description </FormLabel>
              <InputGroup size="sm">
                <FormControl
                  type="text"
                  id={props.todoDescriptionId}
                  value={props.todoDescriptionValue}
                  name={props.todoDescriptionId}
                  onChange={props.handleChange}
                />
              </InputGroup>
            </div>
          </div>
        </form>
      </div>
      <CustomButton
        disabled={props.disabled}
        isLoading={props.inProgress}
        submitFunction={props.handleSubmit}
        id="generateQRCodes"
        className="btn onboarding-btn float-right"
        text={SUBMIT}
        type="submit"
      />
    </div>
  );
};

AddEditTodoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  todoTitleId: PropTypes.string.isRequired,
  todoDescriptionId: PropTypes.string.isRequired,
  todoTitleValue: PropTypes.string.isRequired,
  todoDescriptionValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

AddEditTodoForm.defaultProps = {
  formErrors: {},
};
export default AddEditTodoForm;
