import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NewsList from './components/News List/NewsList';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/Home/HomePage';
import Footer from './components/Footer/footer';

function App() {
  let categories = ["sports", "business", "technology", "entertainment", "health", "science", "lifestyle", "travel"];
  return (
    <>
      <Router>
        <NavBar />
        <div style={{ paddingTop: '10px', paddingBottom: '80px' }}>
          <Routes>
            {/* Home Page Route */}
            <Route path="/" element={<HomePage />} />
            {/* Dynamic category routes */}

            {categories.map(category => (
              <Route key={category} path={`/${category}`} element={<NewsList category={category} />} />
            ))}
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
