// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// Redux
import store, { history } from './redux/configureStore';
import { fetchAppData } from './redux/actions/appData';

// Containers
import App from './containers/App';

// Service worker
import registerServiceWorker from './registerServiceWorker';

// Base styles
import './index.css';

// Render the app
const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target,
);

// Load data
store.dispatch(fetchAppData());

// Set up service worker
registerServiceWorker();
