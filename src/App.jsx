import "./index.css";
import { useState } from "react";
import Hero from "./components/custom/Hero"; // ✅ Ensure path is correct

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-full">
      {/* Hero */}
      <Hero />
    </div>
  );
}

export default App;
