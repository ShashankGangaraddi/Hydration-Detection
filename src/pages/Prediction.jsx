import React, { useState } from 'react';
import axios from 'axios';
import { FiUser, FiDroplet, FiThermometer, FiActivity, FiLoader } from 'react-icons/fi';
import UrineColorChart from '../components/UrineColorChart.jsx';

const Prediction = () => {
  const [formData, setFormData] = useState({
    user_sex: '',
    user_age: '',
    user_weight: '',
    user_height: '',
    physical_activity_level: '',
    fluid_intake_last_24h: '',
    urine_frequency: '',
    urine_color_score: '',
    sleep_hours: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Convert form data to match the model's expected format
      const requestData = {
        ...formData,
        user_sex: formData.user_sex === 'male' ? 1 : 0,
        physical_activity_level: formData.physical_activity_level === 'high' ? 2 : 
                                formData.physical_activity_level === 'moderate' ? 1 : 0,
        user_age: parseInt(formData.user_age),
        user_weight: parseFloat(formData.user_weight),
        user_height: parseFloat(formData.user_height),
        fluid_intake_last_24h: parseFloat(formData.fluid_intake_last_24h),
        urine_frequency: parseInt(formData.urine_frequency),
        urine_color_score: parseInt(formData.urine_color_score),
        sleep_hours: parseFloat(formData.sleep_hours)
        // The rest of the physiological data will be provided by sensors
      };

      // For demo purposes, we'll simulate the prediction
      // In production, this would call your Flask/FastAPI backend
      const response = await simulatePrediction(requestData);
      setPrediction(response);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Simulate prediction for demo purposes
  const simulatePrediction = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple rule-based prediction for demo
    let hydrationClass = 0;
    let confidence = 0.85;
    
    if (data.urine_color_score > 4 || data.urine_frequency < 4 || 
        (data.fluid_intake_last_24h / data.user_weight) < 0.025) {
      hydrationClass = 2; // Dehydrated
      confidence = 0.92;
    } else if (data.urine_color_score >= 3 || data.urine_frequency <= 5) {
      hydrationClass = 1; // Mildly Dehydrated
      confidence = 0.88;
    }

    const estimatedUrineVolume = (data.user_sex === 1 && data.user_age <= 45) ? 22 * 15 :
                                (data.user_sex === 0 && data.user_age <= 45) ? 21 * 15 :
                                (data.user_sex === 1 && data.user_age > 45) ? 27 * 15 : 25 * 15;

    return {
      hydration_class: hydrationClass,
      confidence: confidence,
      estimated_urine_volume: estimatedUrineVolume,
      recommendations: getRecommendations(hydrationClass)
    };
  };

  const getRecommendations = (hydrationClass) => {
    switch (hydrationClass) {
      case 0:
        return [
          "Excellent! Your hydration levels are optimal.",
          "Continue your current fluid intake pattern.",
          "Monitor your urine color to maintain this level."
        ];
      case 1:
        return [
          "You are mildly dehydrated. Increase water intake gradually.",
          "Aim for 8-10 glasses of water throughout the day.",
          "Monitor your urine color - it should be pale yellow."
        ];
      case 2:
        return [
          "You are dehydrated. Immediate action required!",
          "Increase water intake significantly and gradually.",
          "Consider electrolyte solutions if symptoms persist.",
          "Consult a healthcare provider if severe symptoms occur."
        ];
      default:
        return ["Unable to provide recommendations at this time."];
    }
  };

  const getHydrationStatus = (classId) => {
    switch (classId) {
      case 0: return { status: "Hydrated", className: "hydrated" };
      case 1: return { status: "Mildly Dehydrated", className: "mild-dehydrated" };
      case 2: return { status: "Dehydrated", className: "dehydrated" };
      default: return { status: "Unknown", className: "" };
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          <FiDroplet style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Hydration Prediction
        </h1>
        
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>
            <FiUser style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Personal Information
          </h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="user_sex">Gender</label>
              <select 
                name="user_sex" 
                id="user_sex"
                value={formData.user_sex}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="user_age">Age (years)</label>
              <input 
                type="number" 
                name="user_age" 
                id="user_age"
                value={formData.user_age}
                onChange={handleChange}
                min="14" 
                max="45"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="user_weight">Weight (kg)</label>
              <input 
                type="number" 
                name="user_weight" 
                id="user_weight"
                value={formData.user_weight}
                onChange={handleChange}
                min="20" 
                max="300"
                step="0.1"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="user_height">Height (cm)</label>
              <input 
                type="number" 
                name="user_height" 
                id="user_height"
                value={formData.user_height}
                onChange={handleChange}
                min="100" 
                max="250"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="physical_activity_level">Physical Activity Level</label>
            <select 
              name="physical_activity_level" 
              id="physical_activity_level"
              value={formData.physical_activity_level}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity Level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Hydration Metrics */}
          <h3 style={{ color: '#333', marginBottom: '1rem', marginTop: '2rem' }}>
            <FiDroplet style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Hydration Metrics
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fluid_intake_last_24h">Fluid Intake Last 24h (L)</label>
              <input 
                type="number" 
                name="fluid_intake_last_24h" 
                id="fluid_intake_last_24h"
                value={formData.fluid_intake_last_24h}
                onChange={handleChange}
                min="0" 
                max="10"
                step="0.1"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="urine_frequency">Urine Frequency (times/day)</label>
              <input 
                type="number" 
                name="urine_frequency" 
                id="urine_frequency"
                value={formData.urine_frequency}
                onChange={handleChange}
                min="1" 
                max="20"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="urine_color_score">Urine Color Score (1-8, 1=pale yellow, 8=dark brown)</label>
            <input 
              type="number" 
              name="urine_color_score" 
              id="urine_color_score"
              value={formData.urine_color_score}
              onChange={handleChange}
              min="1" 
              max="8"
              required
            />
          </div>

          {/* Urine Color Reference Chart */}
          <UrineColorChart />

          {/* Physiological Data */}
          <h3 style={{ color: '#333', marginBottom: '1rem', marginTop: '2rem' }}>
            <FiThermometer style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Physiological Data
          </h3>

          <div className="form-group">
            <label htmlFor="sleep_hours">Sleep Hours (last night)</label>
            <input 
              type="number" 
              name="sleep_hours" 
              id="sleep_hours"
              value={formData.sleep_hours}
              onChange={handleChange}
              min="0" 
              max="24"
              step="0.5"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '2rem' }}>
            {loading ? (
              <>
                <FiLoader style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Analyzing...
              </>
            ) : (
              <>
                <FiActivity style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Get Prediction
              </>
            )}
          </button>
        </form>

        {prediction && (
          <div className={`prediction-result ${getHydrationStatus(prediction.hydration_class).className}`}>
            <h2>Prediction Result</h2>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Status: {getHydrationStatus(prediction.hydration_class).status}
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Confidence: {(prediction.confidence * 100).toFixed(1)}%
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
              Estimated Urine Volume: {prediction.estimated_urine_volume} mL
            </div>
            
            <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '8px' }}>
              <h4>Recommendations:</h4>
              <ul style={{ marginTop: '0.5rem' }}>
                {prediction.recommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
