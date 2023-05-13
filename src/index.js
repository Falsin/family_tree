import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <div>This is a test App</div>
}

const root = createRoot(document.getElementById("root"));
root.render(<App />)