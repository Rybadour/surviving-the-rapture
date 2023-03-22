import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { UnimatrixProvider } from './contexts/unimatrix';
import { Unimatrix } from './components/unimatrix/unimatrix';
import { Inventory } from './components/inventory/inventory';
import { InventoryProvider } from './contexts/inventory';
import { Exploration } from './components/exploration/exploration';
import { ExplorationProvider } from './contexts/exploration';
import { WorkbenchProvider } from './contexts/workbench';

function App() {
  return (
    <WorkbenchProvider>
    <ExplorationProvider>
    <InventoryProvider>
      <div className="App">
        <Exploration />
        <Inventory />
      </div>
    </InventoryProvider>
    </ExplorationProvider>
    </WorkbenchProvider>
  );
}

export default App;
