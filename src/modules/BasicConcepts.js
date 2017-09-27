import { createAction, handleActions } from 'redux-actions';

const actionsPrefix = 'basic-concepts';

const INCREMENT_COUNTER_1 = `${actionsPrefix}/INCREMENT_COUNTER_1`;
export const incrementCounter1 = createAction(INCREMENT_COUNTER_1);

const INCREMENT_COUNTER_2 = `${actionsPrefix}/INCREMENT_COUNTER_2`;
export const incrementCounter2 = createAction(INCREMENT_COUNTER_2);

const TOGGLE_OBJECT_PROP_MODE = `${actionsPrefix}/TOGGLE_OBJECT_PROP_MODE`;
export const toggleObjectPropMode = createAction(TOGGLE_OBJECT_PROP_MODE);

const SET_SAME_PROP = `${actionsPrefix}/SET_SAME_PROP`;
export const setSameProp = createAction(SET_SAME_PROP);

const INITIAL_STATE = {
  counter1: 0,
  counter2: 0,
  objectPropMode: 'state',
  objectProp: {},
  sameProp: 'same'
};

export default handleActions({
  [incrementCounter1]: (state) => {
    console.log('**** incrementCounter1');
    return { ...state, counter1: state.counter1 + 1 };
  },
  [incrementCounter2]: (state) => {
    console.log('**** incrementCounter2');
    return { ...state, counter2: state.counter2 + 1 };
  },
  [toggleObjectPropMode]: (state) => {
    console.log('**** toggleObjectPropMode');
    return { ...state, objectPropMode: state.objectPropMode === 'state' ? 'hard-coded' : 'state' };
  },
  [setSameProp]: (state) => {
    console.log('**** setSameProp');
    return { ...state, sameProp: 'same' };
  }
}, INITIAL_STATE);

export const getCounter1 = (state) => state.basicConcepts.counter1;
export const getObjectPropMode = (state) => state.basicConcepts.objectPropMode;
const getObjectPropFromState = (state) => state.basicConcepts.objectProp;
export const getObjectProp = (state) =>
  (getObjectPropMode(state) === 'state' ? getObjectPropFromState(state) : {});
export const getSameProp = (state) => state.basicConcepts.sameProp;
