import "./App.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const lights = [
    { color: "red", time: 3000 },
    { color: "yellow", time: 1000 },
    { color: "green", time: 2000 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Clear any existing timer when effect runs or on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    // Cleanup previous timer before setting a new one
    if (timerRef.current) clearTimeout(timerRef.current);

    // Schedule next light transition
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % lights.length);
    }, lights[activeIndex].time);

    // Cleanup when activeIndex or lights change
    return () => clearTimeout(timerRef.current);
  }, [activeIndex, lights]);

  return (
    <div className="container">
      {lights.map((light, idx) => (
        <div
          key={light.color}
          className={`box ${idx === activeIndex ? light.color : ""}`}
        >
          {light.color}
        </div>
      ))}
    </div>
  );
}
