import React from 'react';
import PropTypes from 'prop-types';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Todo.scss';

class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showDescription: false
        }
    }

    handleDescription = ()=>{
        this.setState({showDescription:!this.state.showDescription})
    }

    render(){
        const {data} = this.props;
        const {title, description, id, key} = data;
        return (
            <div className="col col-12 p-2 m-2 card border todo " key={key}>
               <div className="row"> 
                    <div className="col col-10" onClick={eve=>this.handleDescription()}>
                        <div className="todo-title p-1">{title}</div>
                        {this.state.showDescription && <div className="p-1 todo-description">{description}</div>}
                    </div>
                    <button type="button" className="col col-1 text-right edit-button" onClick={eve=>this.props.handleEdit(id)}>
                            <FontAwesomeIcon className="w-100" icon={faEdit} />
                    </button>

                    <button type="button" className="col col-1 text-right delete-button" onClick={eve=>this.props.handleDelete(id)}>
                            <FontAwesomeIcon className="w-100" icon={faTrashAlt} />
                    </button>
               </div>
            </div>
       )
    }
}

Todo.propTypes = {
    data: PropTypes.object,
    paginationData: PropTypes.object.isRequired
};
  
Todo.defaultProps = {
    data: {}
};
  export default Todo;