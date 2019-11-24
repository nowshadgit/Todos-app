import React from 'react';

import './AsOnboardingCard.scss';
export default WrappedComponent => props => (
  <div className="as-onboarding-card">
    <div className="container-fluid h-100">
      <div className="row h-100 card-row justify-content-center">
        <div className="col col-xs-12 col-md-8 text-center">
          <div className="card fp-card mt-5">
            <div className="card-body fp-card-body">
              <WrappedComponent {...props} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
