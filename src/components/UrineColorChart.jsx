import React from 'react';
import { FiInfo } from 'react-icons/fi';

const UrineColorChart = () => {
  const colorLevels = [
    { level: 1, color: '#F5F5DC', description: 'Pale Yellow', hydration: 'Well Hydrated' },
    { level: 2, color: '#FFFFE0', description: 'Light Yellow', hydration: 'Hydrated' },
    { level: 3, color: '#FFFF99', description: 'Yellow', hydration: 'Mildly Dehydrated' },
    { level: 4, color: '#FFD700', description: 'Dark Yellow', hydration: 'Mildly Dehydrated' },
    { level: 5, color: '#FFA500', description: 'Orange', hydration: 'Dehydrated' },
    { level: 6, color: '#FF8C00', description: 'Dark Orange', hydration: 'Severely Dehydrated' },
    { level: 7, color: '#CD853F', description: 'Brown', hydration: 'Severely Dehydrated' },
    { level: 8, color: '#8B4513', description: 'Dark Brown', hydration: 'Critical Dehydration' }
  ];

  return (
    <div className="urine-color-chart">
      <h4 style={{ marginBottom: '1rem', color: '#333', display: 'flex', alignItems: 'center' }}>
        <FiInfo style={{ marginRight: '0.5rem' }} />
        Urine Color Reference Chart
      </h4>
      <div className="color-grid">
        {colorLevels.map((item) => (
          <div key={item.level} className="color-item">
            <div 
              className="color-circle"
              style={{ 
                backgroundColor: item.color,
                border: '2px solid #ddd',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                margin: '0 auto 0.5rem'
              }}
            />
            <div className="color-info">
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                Level {item.level}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {item.description}
              </div>
              <div style={{ 
                fontSize: '0.7rem', 
                color: item.level <= 2 ? '#4caf50' : item.level <= 4 ? '#ff9800' : '#f44336',
                fontWeight: 'bold',
                marginTop: '0.2rem'
              }}>
                {item.hydration}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        <strong>Note:</strong> This chart is for reference only. Individual variations may occur due to 
        medications, vitamins, or medical conditions. Consult a healthcare provider if you have concerns.
      </div>
    </div>
  );
};

export default UrineColorChart;
