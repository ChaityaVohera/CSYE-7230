// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles.css';
import { ChakraProvider } from "@chakra-ui/react";



createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // <ReactDOM.StrictMode>
    // <Router>
      <ChakraProvider>
      <App />
      </ChakraProvider>
    // {/* </Router> */}
  // </ReactDOM.StrictMode>
    
    
  // </StrictMode>
)
