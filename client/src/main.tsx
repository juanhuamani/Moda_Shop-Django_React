import { createRoot } from 'react-dom/client'
import { App } from "./app";
import './index.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

createRoot(root).render(
    <App />
);
