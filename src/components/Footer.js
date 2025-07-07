import React from 'react';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Made with <FiHeart style={{ color: '#ff6b6b', verticalAlign: 'middle' }} /> for Raspberry Pi 3
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: '0.8' }}>
          Hydration Detection System © 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
 