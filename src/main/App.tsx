import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from '../components/Header';

function App() {
  return (
    <div className="h-screen grid grid-rows-[80px,1fr]">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
