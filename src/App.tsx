import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { UnimatrixProvider } from './contexts/unimatrix';
import { Unimatrix } from './components/unimatrix';
import { Inventory } from './components/inventory';

function App() {
  return (
    <UnimatrixProvider>
      <div className="App">
        <Unimatrix />
        <Inventory />
      </div>
    </UnimatrixProvider>
  );
}

export default App;
