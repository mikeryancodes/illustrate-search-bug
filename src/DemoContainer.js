import { connect } from 'react-redux';
import {
  getError,
  getLoading,
  setError,
  getObjectProp,
  getObjectPropMode,
  makeSimulatedApiRequest,
  toggleObjectPropMode,
} from './modules/RequestHandler';
import Demo from './Demo';

const mapStateToProps = (state) => ({
  error: getError(state),
  loading: getLoading(state),
  objectProp: getObjectProp(state),
  objectPropMode: getObjectPropMode(state)
});

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(setError({error})),
  makeSimulatedApiRequest: () => dispatch(makeSimulatedApiRequest()),
  toggleObjectPropMode: () => dispatch(toggleObjectPropMode())
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  setError: (e) => {
    e.preventDefault();
    dispatchProps.setError(!stateProps.error);
  },
});

const DemoContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Demo);

export default DemoContainer;
