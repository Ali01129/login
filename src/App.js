import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Use the "element" prop instead of "component" */}
          <Route path="/" element={<Login />} />
          <Route path="/sign" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
