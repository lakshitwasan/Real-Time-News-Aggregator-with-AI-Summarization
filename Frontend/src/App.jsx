import React from 'react';
import './App.css';
import NewsList from './components/NewsList';
import NavBar from './components/Navbar/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: '70px' }}>
        <NewsList />
      </div>
    </>
  );
}

export default App;
