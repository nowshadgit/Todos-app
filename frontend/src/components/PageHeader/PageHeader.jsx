import React from 'react';
import PropTypes from 'prop-types';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PageHeader.scss';
import { reverse } from 'named-urls';

const PageHeader = props => {
  const actions =
    props.actions &&
    props.actions.map((actionObject, index) => {
      const redirectTo = props.redirect && props.redirect[actionObject.text];
      const { params } = props.match;
      const url =
        params && redirectTo ? reverse(redirectTo, { ...params }) : '';
      return (
        <button
          key={index}
          className="btn btn-sm btn-primary"
          onClick={() => actionObject.handler({ ...props }, url)}
          id={actionObject.id}
        >
          {actionObject.text}
        </button>
      );
    });

  const actionComponent =
    actions.length > 0 ? (
      <>
        <div
          key="actionButton"
          className="col col-md-7 d-none d-md-block text-right"
        >
          {actions}
        </div>
        <div key="actionEllipsis" className="col col-2 d-md-none text-right">
          <div className="options-btn" role="button">
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        </div>
      </>
    ) : null;

  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col col-xs-10 col-md-5">
          <h5 className="page-title">{props.title}</h5>
        </div>
        {actionComponent}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  actions: PropTypes.array,
  title: PropTypes.string,
  redirect: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  match: PropTypes.object
};

PageHeader.defaultProps = {
  actions: [],
  redirect: () => {},
  match: {},
  title: ''
};

export default PageHeader;
