import React from 'react';
import './App.css';
import Homepage from './components/Homepage.js';
import Courses from './components/CoursePage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import LoginForm from './components/LoginForm.js';

export const linkTitles = React.createContext(null);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/homepage" element={<Homepage />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
