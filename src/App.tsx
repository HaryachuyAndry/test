import React from 'react';

import './App.css';
import MainLayout from './layout/MainLayout';
import RootRouter from './router/RootRouter';

function App() {
  return (
    <MainLayout>
      <RootRouter />
    </MainLayout>
  );
}

export default App;
