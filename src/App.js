import "./App.css";

//import des Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import des pages
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<Game />} />
          <Route />
          <Route />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
