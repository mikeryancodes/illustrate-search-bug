import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Demo extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    objectPropMode: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
    makeSimulatedApiRequest: PropTypes.func.isRequired,
    toggleObjectPropMode: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(newProps) {
    console.log('**** Demo | componentWillReceiveProps');
    if (newProps.error) {
      return this.props.makeSimulatedApiRequest();
    }
  }

  render() {
    console.log('**** Demo | render');
    const {
      loading,
      error,
      setError,
      objectPropMode,
      toggleObjectPropMode
    } = this.props;
    const objectPropModeBlurb = {
      'hard-coded': "This component uses a hard-coded object prop, which will cause the component to update on every state change.",
      'state': "This component uses an object prop stored in state, which will not cause the component to update on every state change.  We will still have an infinite loop of requests, though."
    }[objectPropMode];

    return (
      <div>
        <div className="explanation">
          <div className="state-value">
            objectPropMode: { objectPropMode }
          </div>
          { objectPropModeBlurb }
          <div className="dispatch-button">
            <button onClick={toggleObjectPropMode}>Click here to toggle object prop mode</button>
          </div>
        </div>
        <div className="explanation">
          <div className="state-value">
            loading: {`${loading}`}
          </div>
          <div className="state-value">
            error: {`${error}`}
          </div>
          <div className="dispatch-button">
            <button onClick={setError}>Click to set error to {`${!error}`}</button>
          </div>
        </div>
      </div>
    );
  }
}
