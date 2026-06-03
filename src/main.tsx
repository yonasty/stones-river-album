
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import "./app/global.css";
  import "./app/stones-river-header.css";

  createRoot(document.getElementById("root")!).render(<App />);
  