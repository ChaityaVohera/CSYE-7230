// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles.css';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // <ReactDOM.StrictMode>
    // <Router>
      <App />
    // {/* </Router> */}
  // </ReactDOM.StrictMode>
    
    
  // </StrictMode>
)
