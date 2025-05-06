import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BlogContextProvider } from "./context/BlogContext";
import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthContextProvider>
     <BlogContextProvider>
    <App />
    </BlogContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
