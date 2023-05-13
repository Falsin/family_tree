import React from "react";
import { createRoot } from "react-dom/client";

function App(params) {
  return <div>This is test App</div>
}

const root = createRoot(document.getElementById("root"));
root.render(<App />)