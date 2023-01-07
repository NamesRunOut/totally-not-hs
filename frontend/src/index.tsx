import React from 'react';
import ReactDOM from 'react-dom/client';
import PageController from './patterns/PageController';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
        <PageController />
    // </React.StrictMode>
);