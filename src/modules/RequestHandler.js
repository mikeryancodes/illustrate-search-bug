import { createAction, handleActions } from 'redux-actions';
import { call, put, select } from 'redux-saga/effects';
import { delay, takeEvery } from 'redux-saga';

const actionsPrefix = 'requestHandler';

const SET_ERROR = `${actionsPrefix}/SET_ERROR`;
export const setError = createAction(SET_ERROR);

const SET_LOADING = `${actionsPrefix}/SET_LOADING`;
export const setLoading = createAction(SET_LOADING);

const MAKE_SIMULATED_API_REQUEST = `${actionsPrefix}/MAKE_SIMULATED_API_REQUEST`;
export const makeSimulatedApiRequest = createAction(MAKE_SIMULATED_API_REQUEST);

const TOGGLE_OBJECT_PROP_MODE = `${actionsPrefix}/TOGGLE_OBJECT_PROP_MODE`;
export const toggleObjectPropMode = createAction(TOGGLE_OBJECT_PROP_MODE);

const INITIAL_STATE = {
  error: false,
  loading: false,
  concurrentRequests: 0,
  totalRequests: 0,
  objectPropMode: 'hard-coded',
  maxTotalRequests: 100,
  maxConcurrentRequests: 100,
};

export default handleActions({
  [setError]: (state, action) => ({...state, error: action.payload.error}),
  [setLoading]: (state, action) => {
    const newState = {
      ...state,
      loading: action.payload.loading
    }
    if (action.payload.loading) {
      newState.concurrentRequests++;
      newState.totalRequests++;
    } else {
      newState.concurrentRequests--;
    }
    return newState
  },
  [toggleObjectPropMode]: (state) => ({
    ...state,
    objectPropMode: state.objectPropMode === 'hard-coded' ? 'state' : 'hard-coded',
    maxConcurrentRequests: state.objectPropMode === 'hard-coded' ? 100 : 50
  })
}, INITIAL_STATE);

export const getError = (state) => state.requestHandler.error;
export const getLoading = (state) => state.requestHandler.loading;
export const getCounters = (state) => ({
  concurrentRequests: state.requestHandler.concurrentRequests,
  totalRequests: state.requestHandler.totalRequests
});
export const getObjectPropMode = (state) => state.requestHandler.objectPropMode;
export const getObjectPropFromState = (state) => state.requestHandler.objectProp;
export const getObjectProp = (state) =>
  (getObjectPropMode(state) === 'hard-coded' ? {} : getObjectPropFromState(state));

export const getRequestLimits = (state) => ({
  maxTotalRequests: state.requestHandler.maxTotalRequests,
  maxConcurrentRequests: state.requestHandler.maxConcurrentRequests,
});

const getTracer = () => Math.round(Math.random() * 10000);
const getTimeDelay = () => 20 + Math.round(Math.random() * 30);

export function sagas() {
  function *handleSimulatedApiRequest() {
    const { totalRequests, concurrentRequests } = yield select(getCounters);
    yield call(console.log, `**** totalRequests: ${totalRequests} | concurrentRequests: ${concurrentRequests}`);
    const { maxTotalRequests, maxConcurrentRequests } = yield select(getRequestLimits);
    if (totalRequests > maxTotalRequests || concurrentRequests > maxConcurrentRequests) {
      yield call(console.log, '****************************');
      yield call(console.log, 'Too many requests, resetting');
      yield call(console.log, '****************************');
      yield put(setError({error: false}));
      return;
    }
    const tracer = yield call(getTracer);
    yield call(console.log, `**** ${tracer} starting`);
    yield put(setLoading({loading: true}));
    const timeDelay = yield call(getTimeDelay);
    yield delay(timeDelay);
    yield call(console.log, `**** ${tracer} ending`);
    yield put(setLoading({loading: false}));
  }

  return {
    *watchMakeSimulatedApiRequest() {
      yield* takeEvery(MAKE_SIMULATED_API_REQUEST, handleSimulatedApiRequest);
    }
  }
}
