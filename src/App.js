import "./App.css";

//import des Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import des pages
import Header from "./components/Header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route />
          <Route />
          <Route />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
