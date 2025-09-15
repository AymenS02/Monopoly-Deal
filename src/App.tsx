import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game"; // you’ll create this file soon

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Game Page */}
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
