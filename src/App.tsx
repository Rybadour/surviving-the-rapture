import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { Inventory } from './components/inventory/inventory';
import { Exploration } from './components/exploration/exploration';

function App() {
  return (
    <div className="App">
      <Exploration />
      <Inventory />
    </div>
  );
}

export default App;
