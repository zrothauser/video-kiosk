// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// Redux
import store, { history } from './redux/configureStore';

// Containers
import App from './containers/App';

// Base styles
import './resources/fonts/fonts.css';
import './index.css';

// Render the app
const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target,
);
