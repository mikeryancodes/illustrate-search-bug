import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import BasicConceptsContainer from './BasicConceptsContainer';
import DemoContainer from './DemoContainer';

import { default as basicConcepts } from './modules/BasicConcepts';

import {
  default as requestHandler,
  sagas as requestHandlerSagas
}  from './modules/RequestHandler';

const { watchMakeSimulatedApiRequest } = requestHandlerSagas();

const reducer = combineReducers({ basicConcepts, requestHandler });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer, /* preloadedState, */
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function *rootSaga() {
  yield [
    watchMakeSimulatedApiRequest(),
  ]
}

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route name="basic-concepts" component={BasicConceptsContainer} path="/basic-concepts" />
        <Route name="hard-coded-demo" component={DemoContainer} path="/demo" />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
