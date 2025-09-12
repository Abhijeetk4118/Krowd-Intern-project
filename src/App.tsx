import React from 'react';
import Dashboard from './components/Dashboard';
import { SalesRecord } from './types';
import salesData from './data/salesData.json';
import './App.css';

const App: React.FC = () => {
  const salesRecords: SalesRecord[] = salesData;

  return (
    <div className="App">
      <Dashboard salesData={salesRecords} />
    </div>
  );
};

export default App;