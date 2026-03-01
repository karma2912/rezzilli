import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Spritz from "./pages/Spritz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spritz" element={<Spritz />} />
      </Routes>
    </Router>
  );
}

export default App;