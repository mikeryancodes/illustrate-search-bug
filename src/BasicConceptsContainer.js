import { connect } from 'react-redux';
import {
  getCounter1,
  getSameProp,
  getObjectPropMode,
  getObjectProp,
  incrementCounter1,
  incrementCounter2,
  toggleObjectPropMode,
  setSameProp,
} from './modules/BasicConcepts';

import BasicConcepts from './BasicConcepts';

const mapStateToProps = (state) => ({
  counter1: getCounter1(state),
  sameProp: getSameProp(state),
  objectPropMode: getObjectPropMode(state),
  objectProp: getObjectProp(state)
});

const mapDispatchToProps = (dispatch) => ({
  incrementCounter1: (e) => {
    e.preventDefault();
    dispatch(incrementCounter1());
  },
  incrementCounter2: (e) => {
    e.preventDefault();
    dispatch(incrementCounter2());
  },
  toggleObjectPropMode: (e) => {
    e.preventDefault();
    dispatch(toggleObjectPropMode());
  },
  setSameProp: (e) => {
    e.preventDefault();
    dispatch(setSameProp());
  }
});

const BasicConceptsContainer = connect(mapStateToProps, mapDispatchToProps)(BasicConcepts);

export default BasicConceptsContainer;
