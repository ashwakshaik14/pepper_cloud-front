import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SelfHeal from './selfheal.js'

const selfheal = new SelfHeal(
    import.meta.env.VITE_SERVER_URL,
    import.meta.env.VITE_API_KEY
);
selfheal.init(
    "https://github.com/ashwakshaik14/pepper_cloud-front",
    "src/App.jsx"
);

createRoot(document.getElementById('root')).render(
    <App />
)
