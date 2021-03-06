import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import reducerRegistry from './utils/reducerRegistry';
import sagaRegistry from './utils/sagaRegistry';

import { connectRouter } from 'connected-react-router';

import globalReducer from './global.reducer';

export default function configureStore(preloadedState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  // preserve preloadedState for not-yet-loaded reducers
  const combine = reducers => {
    const reducerNames = Object.keys(reducers);
    Object.keys(preloadedState).forEach(item => {
      if (reducerNames.indexOf(item) === -1) {
        reducers[item] = (state = null) => state;
      }
    });
    return combineReducers(reducers);
  };

  const reducer = combine({
    router: connectRouter(history),
    global: globalReducer,
    ...reducerRegistry.getReducers(),
  });

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));

  const combineSaga = sagas => {
    const sagaNames = Object.keys(sagas);
    return sagaNames.map(x => sagas[x]());
  };

  function* rootSaga() {
    yield all(combineSaga(sagaRegistry.getSagas()));
  }
  sagaMiddleware.run(rootSaga);

  return store;
}
