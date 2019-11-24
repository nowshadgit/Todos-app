import React from 'react';
import PropTypes from 'prop-types';
import './Table.scss';
import CustomPagination from '../CustomPagination/CustomPagination';

const Table = props => {
  const { header, body, paginationData } = props;
  return (
    <div>
      <div className="custom-table border table-responsive text-capitalize">
        <table className="table ">
          <thead>{header}</thead>
          <tbody>{body}</tbody>
        </table>
      </div>
      <CustomPagination {...paginationData} />
    </div>
  );
};

Table.propTypes = {
  header: PropTypes.object.isRequired,
  body: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  paginationData: PropTypes.object.isRequired
};

Table.defaultProps = {
  body: []
};
export default Table;
