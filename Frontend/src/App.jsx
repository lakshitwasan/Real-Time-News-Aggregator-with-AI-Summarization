import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NewsList from './components/News List/NewsList';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/Home/HomePage';
import Footer from './components/Footer/footer';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div style={{ paddingTop: '10px', paddingBottom: '50px' }}>
          <Routes>
            {/* Home Page Route */}
            <Route path="/" element={<HomePage />} />
            {/* News Page Route */}
            <Route path="/news" element={<NewsList />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
