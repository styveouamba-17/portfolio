import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DeskApp from './desk/DeskApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeskApp />
  </StrictMode>,
)
