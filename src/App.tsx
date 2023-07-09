import React from 'react';
import RouterComponent from './Components/Router';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Hooks/api';

function App() {
  return (
    <Provider store={store}>
      <RouterComponent />
    </Provider>
  );
}

export default App;
