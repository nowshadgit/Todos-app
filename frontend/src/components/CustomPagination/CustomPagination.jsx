import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PageItem } from 'react-bootstrap';
import './CustomPagination.scss';

function CustomPagination(props) {
  const {
    start,
    end,
    currentPage,
    totalPages,
    onPagination,
    onPageChange
  } = props;
  const paginationItems = () => {
    const items = [];
    if (start !== end) {
      for (let i = start; i <= end; i += 1) {
        items.push(
          <PageItem
            className="pagination-boxes"
            key={i}
            onClick={() => {
              onPageChange(i);
            }}
            active={i === currentPage}
          >
            {i}
          </PageItem>
        );
      }
      return items;
    }
    return null;
  };
  return (
    <Pagination className="justify-content-end mt-3">
      {currentPage !== 1 ? (
        <Pagination.Prev
          className="pagination-boxes"
          onClick={() => {
            onPagination('prev', totalPages);
          }}
        />
      ) : null}
      {start !== 1 && totalPages > 5 ? (
        <Pagination.Item
          className="pagination-boxes"
          onClick={() => {
            onPagination('firstPage', totalPages);
          }}
        >
          {1}
        </Pagination.Item>
      ) : null}
      {start !== 1 && totalPages > 5 ? (
        <Pagination.Ellipsis
          className="pagination-boxes"
          onClick={() => {
            onPagination('prevEllipsis', totalPages);
          }}
        />
      ) : null}
      {paginationItems()}
      {end !== totalPages && totalPages > 5 ? (
        <Pagination.Ellipsis
          className="pagination-boxes"
          onClick={() => {
            onPagination('nextEllipsis', totalPages);
          }}
        />
      ) : null}
      {end !== totalPages && totalPages > 5 ? (
        <Pagination.Item
          className="pagination-boxes"
          onClick={() => {
            onPagination('lastPage', totalPages);
          }}
        >
          {totalPages}
        </Pagination.Item>
      ) : null}
      {currentPage !== totalPages ? (
        <Pagination.Next
          className="pagination-boxes"
          onClick={() => {
            onPagination('next', totalPages);
          }}
        />
      ) : null}
    </Pagination>
  );
}

CustomPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  onPagination: PropTypes.func.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default CustomPagination;
