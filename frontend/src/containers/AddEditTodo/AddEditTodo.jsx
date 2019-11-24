import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddEditTodoForm from '../../components/AddEditTodoForm/AddEditTodoForm';
import { PAGE} from '../../utils/constants';
import { getErrorResMsg } from '../../utils/formValidations';
import pageConfig from '../../utils/pageConfig';
import { getActionsFormate } from '../../utils/common';
import PageHeader from '../../components/PageHeader/PageHeader';
import ACTIONS from '../../apiConfig/actions.constants';

class AddEditTodo extends React.Component {
  TODO_TITLE = 'todo-title';

  TODO_DESCRIPTION = 'todo-description';

  constructor(props) {
    super(props);
    this.state = {
      formErrors: {},
      formValidity: false,
      [this.ASSET_TYPE_FIELD_ID]: '',
      [this.TODO_DESCRIPTION]: '',
      errorCode: '',
      disabled: true,
      firstRender: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { addEditTodoReducerStore, page } = nextProps;
    const { errorCode } = addEditTodoReducerStore;
    if (errorCode && errorCode !== prevState.errorCode) {
      const errMsg = getErrorResMsg(errorCode, page);
      return { formErrors: errMsg, errorCode };
    }
    if (
      nextProps.page === PAGE.UPDATE_TODO &&
      prevState.firstRender &&
      addEditTodoReducerStore.data &&
      addEditTodoReducerStore.data.length > 0
    ) {
      const todoTitle = addEditTodoReducerStore.data[0].title;
      const todoDesc = addEditTodoReducerStore.data[0].description;
      const disabled = !(todoTitle.length > 0 && todoDesc.length > 0);
      return {
        ['todo-title']:todoTitle,
        ['todo-description']: todoDesc,
        disabled:disabled,
        firstRender: false
      };
    }
    return prevState;
  }

  componentDidMount() {
    this.fetchTodoDetails();
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.currentPage !== prevState.currentPage) {
      this.fetchTodoDetails();
    }
  }

  fetchTodoDetails= ()=>{
    const { page, getTodoDetails, match} = this.props;
    if(page === PAGE.UPDATE_TODO){
      getTodoDetails(ACTIONS.TODOS.GET_TODO_DETAILS, {...match.params})
    }
  }

  enableSubmit = (title, description) => {
    const disabled = !(title.length > 0 && description.length > 0);

    if (this.props.addEditTodoReducerStore.errorCode) {
      const type = ACTIONS.TODOS.RESET_STATE;
      this.props.resetState(type);
      this.setState({ errorCode: '' });
    }
    this.setState({ disabled });
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.id]: event.target.value,
        formErrors: {}
      },
      () =>
        this.enableSubmit(
          this.state[this.TODO_TITLE],
          this.state[this.TODO_DESCRIPTION],
        )
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      title: this.state[this.TODO_TITLE],
      description: this.state[this.TODO_DESCRIPTION]
    };
    const type = pageConfig[this.props.page].actions.postData;
    this.props.submit(type, {data, props:this.props});
    this.enableSubmit(
      this.state[this.TODO_TITLE],
      this.state[this.TODO_DESCRIPTION]
    );
  };

  render() {
    const { addEditTodoReducerStore, page } = this.props;
    const { inProgress, data } = addEditTodoReducerStore;
    const { pageTitle } = pageConfig[page];
    return (
      <div id="add-edit-todo">
        <PageHeader title={pageTitle} />
        <AddEditTodoForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          disabled={this.state.disabled}
          todoTitleId={this.TODO_TITLE}
          todoDescriptionId={this.TODO_DESCRIPTION}
          todoTitleValue={this.state[this.TODO_TITLE]}
          todoDescriptionValue={this.state[this.TODO_DESCRIPTION]}
          inProgress={inProgress}
          formErrors={this.state.formErrors}
        />
      </div>
    );
  }
}

AddEditTodo.propTypes = {
  page: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  errorCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resetState: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
  addEditTodoReducerStore: PropTypes.object.isRequired,
  getTodoDetails: PropTypes.func.isRequired
};

AddEditTodo.defaultProps = {
  errorCode: '',
};

const mapStateToProps = state => ({
  addEditTodoReducerStore: state.addEditTodoReducerStore,

});

const mapDispatchToProps = dispatch => {
  return {
    submit: (type, data) => {
      dispatch(getActionsFormate(type, data));
    },
    resetState: type => {
      dispatch(getActionsFormate(type));
    },
    getTodoDetails: (type, data) => {
      dispatch(getActionsFormate(type,data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEditTodo)
);
