import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BasicConcepts extends Component {
  static propTypes = {
    counter1: PropTypes.number.isRequired,
    objectPropMode: PropTypes.string.isRequired,
    incrementCounter1: PropTypes.func.isRequired,
    incrementCounter2: PropTypes.func.isRequired,
    setSameProp: PropTypes.func.isRequired,
    toggleObjectPropMode: PropTypes.func.isRequired,
  }

  componentWillReceiveProps() {
    console.log('**** BasicConcepts | componentWillReceiveProps');
  }

  render() {
    console.log('**** BasicConcepts | render');

    const {
      counter1,
      objectPropMode,
      sameProp,
      incrementCounter1,
      incrementCounter2,
      setSameProp,
      toggleObjectPropMode,
    } = this.props;

    return (
      <div>
        <div className="explanation">
          <div className="state-value">
            counter1: {counter1}
          </div>
          counter1 is retrieved from state in the container component and passed in.  We expect that
          updating it will always cause componentWillReceiveProps and render to be called.
          <div className="dispatch-button">
            <button onClick={incrementCounter1}>Click to increment counter1</button>
          </div>
        </div>
        <div className="explanation">
          counter2 lives in state, but is not retrieved by the container component.  We expect that updating
          it will not cause componentWillReceiveProps or render to be called, but we will see that this
          depends on whether our object prop is hard-coded or retrieved from state.
          <div className="dispatch-button">
            <button onClick={incrementCounter2}>Click to increment counter2</button>
          </div>
        </div>
        <div className="explanation">
          <div className="state-value">
            objectPropMode: {objectPropMode}
          </div>
          objectPropMode indicates whether we're using a hard-coded object for our object prop, or one retrieved
          from state.  Using a hard-coded object creates a new object each time it is accessed, which means a
          shallow comparison of next/previous props will find that the props have always changed because the object
          ids will always be different.
          <div className="dispatch-button">
            <button onClick={toggleObjectPropMode}>Click to toggle object prop mode</button>
          </div>
        </div>
        <div className="explanation">
          <div className="state-value">
            sameProp: {sameProp}
          </div>
          sameProp is a prop whose value is always written to the same thing on receipt of the action that updates
          it.  This proves that connect is smart enough to recognize when the props haven't actually changed, even
          if the state is updated.  This is because shallow comparison of two strings just looks at whether they
          contain identical sets of characters.
          <div className="dispatch-button">
            <button onClick={setSameProp}>Click to set sameProp</button>
          </div>
        </div>
      </div>
    )
  }
}
