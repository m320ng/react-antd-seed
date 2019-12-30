import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { ConfigProvider } from 'antd';
import configureStore from './configureStore';
import history from 'utils/history';
import App from './App';

import ko_KR from 'antd/es/locale/ko_KR';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

const MOUNT_NODE = document.getElementById('root');

const preloadedState = {};

export const store = configureStore(preloadedState, history);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConfigProvider locale={ko_KR}>
          <App />
        </ConfigProvider>
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
