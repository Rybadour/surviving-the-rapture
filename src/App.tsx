import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { UnimatrixProvider } from './contexts/unimatrix';
import { Unimatrix } from './components/unimatrix';

function App() {
  return (
    <UnimatrixProvider>
      <div className="App">
        <Unimatrix />
      </div>
    </UnimatrixProvider>
  );
}

export default App;
