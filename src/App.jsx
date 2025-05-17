import "./App.css";
import Icao24 from "./Icao24";
import MapView from "./MapView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Icao24 />} />
        <Route path="/" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
