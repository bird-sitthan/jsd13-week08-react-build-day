import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BoardProvider } from "./Context/BoardContext/BoardProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BoardProvider>
    <App />
  </BoardProvider>,
);
