import "./App.css";
import MapView from "./MapView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
