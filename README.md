# HydroSense - Hydration Detection Frontend

A modern React-based frontend for the Hydration Detection System designed for Raspberry Pi 3.

## Features

- **Home Page**: Overview of the system with features and statistics
- **Prediction Page**: Interactive form for hydration level prediction
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Glass-morphism design with gradient backgrounds
- **Real-time Predictions**: Integration with ML backend (demo simulation included)

## Technology Stack

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **React Icons**: Beautiful icons
- **Axios**: HTTP client for API calls
- **Modern CSS**: Glass-morphism and gradient designs

## Installation

1. Navigate to the project directory:
   ```bash
   cd "f:\hydration detection"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   └── Footer.js          # Footer component
├── pages/
│   ├── Home.jsx           # Home page
│   └── Prediction.jsx     # Prediction page
├── App.js                 # Main app component
├── index.js               # Entry point
└── index.css              # Global styles
```

## Backend Integration

The frontend is designed to work with a Python backend that serves the XGBoost model. To integrate with your backend:

1. Update the API endpoint in `src/pages/Prediction.jsx`
2. Replace the `simulatePrediction` function with actual API calls
3. Ensure your backend accepts the following data structure:

```json
{
  "user_sex": 0,              // 0: female, 1: male
  "user_age": 25,
  "user_weight": 70.0,
  "user_height": 175.0,
  "physical_activity_level": 1, // 0: low, 1: moderate, 2: high
  "fluid_intake_last_24h": 2.5,
  "urine_frequency": 6,
  "urine_color_score": 2,
  "ambient_temperature": 22.0,
  "skin_temperature": 36.5,
  "eda_skin_conductance": 5.0,
  "heart_rate": 75,
  "blood_pressure_systolic": 120,
  "blood_pressure_diastolic": 80,
  "sleep_hours": 8.0
}
```

## Building for Production

To build the app for production:

```bash
npm run build
```

This creates a `build` folder with optimized static files that can be served by any web server.

## Deployment on Raspberry Pi 3

1. Build the production version
2. Copy the `build` folder to your Raspberry Pi
3. Serve using a simple HTTP server:
   ```bash
   python3 -m http.server 3000 -d build
   ```

## Features Explained

### Home Page
- System overview and features
- Performance statistics
- Modern glass-morphism design

### Prediction Page
- Comprehensive form for all input parameters
- Real-time validation
- Hydration status prediction with confidence scores
- Personalized recommendations
- Estimated urine volume calculation

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for different screen sizes
- Touch-friendly buttons and inputs

## Customization

### Colors and Themes
Edit `src/index.css` to customize the color scheme and design.

### Adding New Features
- Create new components in `src/components/`
- Add new pages in `src/pages/`
- Update routing in `src/App.js`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is designed for educational and research purposes.
