import React from 'react';
import { Link } from 'react-router-dom';
import { FiDroplet, FiActivity, FiTrendingUp, FiShield, FiInfo } from 'react-icons/fi';
import UrineColorChart from '../components/UrineColorChart.jsx';

const Home = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <h1>HydroSense</h1>
        <p>A Hydration Sensing Machine</p>
        <Link to="/prediction" className="btn btn-primary">
          Start Prediction
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <FiDroplet />
          </div>
          <h3>Real-time Monitoring</h3>
          <p>Monitor hydration levels in real-time using advanced sensors and machine learning algorithms.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FiActivity />
          </div>
          <h3>Bioimpedance analysis</h3>
          <p>Analyze multiple  parameters like urine color and its frequency and other physiological data.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FiTrendingUp />
          </div>
          <h3>Predictive Analytics</h3>
          <p>Using XGBoost machine learning model for hydration classification.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FiShield />
          </div>
          <h3>Health Insights</h3>
          <p>Get personalized health insights and recommendations based on your hydration patterns.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="card">
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>About HydroSense</h2>
        <p style={{ lineHeight: '1.6', color: '#666', marginBottom: '1rem' }}>
          HydroSense is an advanced hydration detection system. It uses Deep Learning Algorithm to analyze while considering multiple parameters and provide accurate hydration status.
        </p>
        <p style={{ lineHeight: '1.6', color: '#666', marginBottom: '1rem' }}>
          The system analyzes using factors:
        </p>
        <ul style={{ color: '#666', marginLeft: '2rem', lineHeight: '1.6' }}>
          <li>Urine color and frequency</li>
          <li>Fluid intake patterns</li>
          <li>Body temperature </li>
          <li>Skin conductance</li>
          <li>Physical activity levels</li>
          <li>Environmental conditions</li>
        </ul>
      </section>

      {/* Hydration Information */}
      <section className="card">
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>
          <FiInfo style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Understanding Hydration Levels
        </h2>
        <UrineColorChart />
        
        <div className="info-box">
          <h4>
            <FiDroplet style={{ marginRight: '0.5rem' }} />
            Hydration Tips
          </h4>
          <p>
            Monitor your urine color throughout the day. Aim for pale yellow (levels 1-2) for optimal hydration. 
            If your urine is consistently dark (levels 5-8), increase your fluid intake and consult a healthcare provider.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
