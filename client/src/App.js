import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Table from './components/Table';
import { UrlContextProvider } from './context/urlContext';

const App = () => {
  return (
    <UrlContextProvider>
      <div className='container'>
        <Header />
        <Form />
        <Table />
      </div>
    </UrlContextProvider>
  );
};

export default App;
