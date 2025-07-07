import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiDroplet, FiHome, FiActivity } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <FiDroplet style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            HydroSense
          </Link>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                <FiHome style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/prediction" 
                className={location.pathname === '/prediction' ? 'active' : ''}
              >
                <FiActivity style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Prediction
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
