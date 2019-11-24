import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import pageConfig from '../../utils/pageConfig';
import PageLoader from '../../components/PageLoader/PageLoader';
import PageHeader from '../../components/PageHeader/PageHeader';
import { getActionsFormate } from '../../utils/common';
import {
  onPagination,
  onPageChange,
} from '../../utils/common';
import ACTIONS from '../../apiConfig/actions.constants';
import Todo from '../../components/Todo/Todo';
import DataNotFound from '../../components/DataNotFound/DataNotFound';
import { TODOS_ROUTE } from '../../config';
import { reverse } from 'named-urls';
import CustomPagination from '../../components/CustomPagination/CustomPagination';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 10,
      currentPage: 1,
      start: 1,
      end: 5
    };
    this.onPagination = onPagination.bind(this);
    this.onPageChange = onPageChange.bind(this);
  }

  componentDidMount() {
    this.fetchTodos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.fetchTodos();
    }
  }

  fetchTodos = () => {
    const { getTodosList, page } = this.props;
    const offset = (this.state.currentPage - 1) * 10;
    getTodosList(ACTIONS.TODOS.GET_TODOS, {
      limit: this.state.perPage,
      offset,
      page,
    });
  };

  handleEdit=(id)=>{
    const { history } = this.props;
    history.push(reverse(TODOS_ROUTE.TODOS.DETAIL.MODIFY, {todoId: id}));
  }

  handleDelete=(id)=>{
    const {deleteTodo } = this.props;
    deleteTodo(ACTIONS.TODOS.DELETE_TODO, {todoId:id});
  }

  render() {
    const { page, inProgress, Data } = this.props;
    const { pageTitle, headerActions, redirect } = pageConfig[page];
    const totalPages =
      Data && Data.count
        ? Math.ceil(Data.count / this.state.perPage)
        : 0;
    const paginationData = {
      start: this.state.start,
      end: totalPages > 5 ? this.state.end : totalPages,
      currentPage: this.state.currentPage,
      onPagination: this.onPagination,
      onPageChange: this.onPageChange,
      totalPages: totalPages < 1 ? 1 : totalPages
    };
    
    let todoKey = 0;
    return (
      <div>
        <PageLoader inProgress={inProgress} />
        <PageHeader
          {...this.props}
          title={pageTitle}
          actions={headerActions}
          redirect={redirect}
        />
        
        {Data && Data.result && Data.result.length>0 && <div className="row todo-list">
        { Data.result.map(each=>{
          todoKey++;
          return <Todo data={each} key={todoKey} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
        })}
          <CustomPagination {...paginationData} />
        </div>}
        {!(Data && Data.result && Data.result.length>0) && <DataNotFound name={"Todos"} />}
        
      </div>
    );
  }
}

Todos.propTypes = {
  getTodosList: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  inProgress: PropTypes.bool.isRequired,
  Data: PropTypes.object,
  history: PropTypes.object.isRequired
};

Todos.defaultProps = {
  Data: {}
};
const mapStateToProps = state => ({
  Data: state.todosReducerStore.data,
  inProgress: state.todosReducerStore.inProgress
});

const mapDispatchToProps = dispatch => {
  return {
    getTodosList: (type, data) => {
      dispatch(getActionsFormate(type, data));
    },
    resetState: type => {
      dispatch(getActionsFormate(type));
    },
    deleteTodo: (type, data)=>{
      dispatch(getActionsFormate(type, data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todos)
);
