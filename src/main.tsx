
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set document title for Artefact
document.title = "Artefact Analytics Dashboard";

createRoot(document.getElementById("root")!).render(<App />);
