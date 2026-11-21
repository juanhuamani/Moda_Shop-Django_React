import { createRoot } from 'react-dom/client'
import { RootShell } from "./app/RootShell";
import './index.css'
import 'react-tooltip/dist/react-tooltip.css'

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

createRoot(root).render(<RootShell />);
