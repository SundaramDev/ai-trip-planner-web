import './index.css';import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hero from "./components/custom/Hero"; // ✅ Ensure this path is correct

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Hero */}
      <Hero />
    </>
  );
}

export default App;
