import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store/ConfigureStore';
import { postDocuments, allDocuments } from './actions/documentsAction.js';
import { loadUsers } from './actions/userActions';
import routes from './routes';

injectTapEventPlugin();

const store = configureStore();

// store.dispatch(loadUsers());

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
