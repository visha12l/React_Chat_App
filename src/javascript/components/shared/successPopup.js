import React from 'react';
import PropTypes from 'prop-types';

export default class SuccessPopup extends React.Component {
      constructor() {
          super();
          this.closePopup = this.closePopup.bind(this);
      }

      closePopup() {
          this.props.closePopup();
      }

      render() {
          return (
              <div className="successPopupWrap">
                  <div className="content">
                      <h3>{this.props.headerText}</h3>
                      <p>{this.props.bodyText}</p>
                      <button className="btn redBtn" onClick={this.closePopup}>OK</button>
                  </div>
              </div>
          );
      }
}

SuccessPopup.defaultProps = {
  closePopup: undefined,
};

SuccessPopup.propTypes = {
  closePopup: PropTypes.func,
};
