import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { Inventory } from './components/inventory/inventory';
import { Exploration } from './components/exploration/exploration';
import Story from './components/story/story';
import styled from 'styled-components';

function App() {
  return (
    <AppContainer>
      <Story />
      <MainContent>
        <Exploration />
        <Inventory />
      </MainContent>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 30px;
`;

const MainContent = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
`;

export default App;
