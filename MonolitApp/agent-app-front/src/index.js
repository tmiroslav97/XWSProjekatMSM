import React from 'react';
import ReactDOM from 'react-dom';
import { Router, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory, createHashHistory } from 'history';
import store from './store';
import AppRouter from './AppRouter';
import NavBar from './containers/NavBar';
import InformationToastsContainer from './containers/Common/InformationToastsContainer';
import { ToastProvider } from 'react-toast-notifications';

// export const history = createBrowserHistory();
export const history = createHashHistory();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      <NavBar />
      <AppRouter />
      <ToastProvider>
        <InformationToastsContainer />
      </ToastProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

