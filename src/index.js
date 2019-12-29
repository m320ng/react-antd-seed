import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter } from 'connected-react-router';

import configureStore from './configureStore';
import history from 'utils/history';
import App from './App';

const MOUNT_NODE = document.getElementById('root');

const preloadedState = {};

const store = configureStore(preloadedState, history);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

/*
if (module.hot) {
  module.hot.accept(['./App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}
*/

render();
