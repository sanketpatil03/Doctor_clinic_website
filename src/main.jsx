import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer 
   bodyClassName="toastBody"
   />
  </StrictMode>,
)
