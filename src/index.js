import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import i18next from '../src/i18next.js';

import App from './components/App';
import configureStore from './redux/configureStore';
// import registerServiceWorker from './registerServiceWorker';

i18next.changeLanguage(_.get(window.__REDUX_STATE__, 'account.language', 'en'))

const store = configureStore( window.__REDUX_STATE__ || {} );

const AppBundle = (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>
);

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            AppBundle,
            document.getElementById('root')
        );
    });
};

// registerServiceWorker();
