import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

import logo from "../img/logo.jpg";

//page principal sur la quelle apparaissent tous les jeux issu de l'API
const Homepage = () => {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2&search=${search}`
        );
        setGames(response.data);
        console.log(response.data.results[0], "response data result[0]");
        console.log(response.data, "response data");
        //renvoie les résultats de la requete à l'API
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [search]);

  // j'ai bien une réponse du serveur avec tous les jeux
  return (
    <div className="Home">
      {isLoading ? (
        <div></div>
      ) : (
        <div>
          {/* searchbar: filtre par nom -----------------------------------------------------------*/}
          <section className="searchBar">
            <div className="homePageLogo">
              <img src={logo} alt="logo GamePad" />
            </div>
            <input
              className="search"
              value={search}
              type="text"
              placeholder="Search for a game..."
              onChange={(event) => setSearch(event.target.value)}
            />
          </section>
          <div className="homeh1">
            <h1>Most Relevance Games</h1>
          </div>

          {/* reponse serveur: games du moment -----------------------------------------------------------*/}
          <section>
            <Link to={"/game"}>
              <GameCard games={games} />
            </Link>
          </section>
        </div>
      )}
    </div>
  );
};

export default Homepage;
