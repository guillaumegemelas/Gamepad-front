import "./App.css";

//import des Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

//import des pages
import Home from "./pages/Home";
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favourites from "./pages/Favourites";
import Review from "./pages/Review";

//import des composants
import Header from "./components/Header";
import Footer from "./components/Footer";

//import des font d'icones vectorielles
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMessage,
  faInbox,
  faHouse,
  faTrashCan,
  faRightToBracket,
  faDoorOpen,
  faFaceGrinWide,
  faCommentDots,
  faThumbsUp,
  faThumbsDown,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faMessage,
  faInbox,
  faHouse,
  faTrashCan,
  faRightToBracket,
  faDoorOpen,
  faFaceGrinWide,
  faCommentDots,
  faThumbsUp,
  faThumbsDown,
  faUserPlus
);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 10 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <div className="App">
      <Router>
        <Header handleToken={handleToken} token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Homepage />} />
          <Route path="/game/:id" element={<Game token={token} />} />
          <Route
            path="/user/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route
            path="/user/login"
            element={<Login handleToken={handleToken} />}
          />
          <Route path="/favourites" element={<Favourites token={token} />} />
          <Route path="/reviews/:name" element={<Review token={token} />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
