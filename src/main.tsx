import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { api } from './api';
import { PersistGate } from 'redux-persist/integration/react';

import './i18n';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <ApiProvider api={api}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </ApiProvider>
    </React.StrictMode>,
);
