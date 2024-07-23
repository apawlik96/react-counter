import { useState } from "react";
import "./App.css";
import { Counter } from "./Counter";

function App() {
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [animalsCount, setAnimalsCount] = useState(0);

  return (
    <div className="App">
      <header>
        <p>Total passengers: {adultCount + childrenCount}</p>
          <Counter onChange={setAdultCount} value={adultCount} tag="adult"/>
          <Counter onChange={setChildrenCount} value={childrenCount} tag="children"/>
          <Counter onChange={setAnimalsCount} value={animalsCount} tag="animals"/>
        
      </header>
    </div>
  );
}

export default App;
