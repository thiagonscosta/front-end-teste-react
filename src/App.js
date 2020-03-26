import React from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import Routes from './routes';
import StoreProvider from './store/provider';

import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Header />
        <Routes />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
