import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import NewsList from './Pages/News List/NewsList';
import NavBar from './Pages/NavBar/NavBar';
import HomePage from './Pages/Home/HomePage';
import Footer from './Pages/Footer/footer';
import Login from './Pages/login/login';
import Registration from './Pages/signup/registration';
import Dashboard from './components/Dashboard';
import Article from './Pages/Article/Article';

function App() {
  let categories = ["sports", "business", "technology", "entertainment", "health", "science", "lifestyle", "travel"];
  return (
    <>
      <AuthProvider>

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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/article" element={<Article />} />
            </Routes>

          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
