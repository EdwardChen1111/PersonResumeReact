import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import ProfilePage from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfilePage />
  </StrictMode>,
)
