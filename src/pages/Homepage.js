import axios from "axios";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

//import du sélecteur
// import Dropdown from "../components/Dropdown";

import logo1 from "../img/logo1.png";

//page principal sur la quelle apparaissent tous les jeux issu de l'API
const Homepage = () => {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //toutes les plateformes selectionnés au state initial
  // const [platforms, setPlatforms] = useState(
  //   "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,187"
  // );
  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // requete sans platform
          // `https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2&search=${search}&page=${page}`

          // requete vers le back fonctionne!!!! plus besoin de clé Api et requete vers serveur local et plus tard northflank:
          `http://localhost:3000/games?&search=${search}&page=${page}`

          // `https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2&search=${search}&page=${page}&platforms=${platforms}`
        );
        setGames(response.data);
        //
        // setPlatforms(response.data.results);
        // console.log(response.data.results, "reponse data platforms");
        //
        // console.log(response.data.results[0], "response data result[0]");
        console.log(response.data, "response data");
        //renvoie les résultats de la requete à l'API
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, page]);

  // j'ai bien une réponse du serveur avec tous les jeux
  return (
    <div className="Home">
      {isLoading ? (
        <div className="isLoading">
          <h1>En cours de chargement</h1>
        </div>
      ) : (
        <div className="global">
          {/* searchbar: filtre par nom -----------------------------------------------------------*/}
          <section className="searchBar">
            <div className="homePageLogo">
              <img src={logo1} alt="logo GamePad" />
            </div>
            <input
              className="search"
              value={search}
              type="text"
              placeholder="Search for a game..."
              onChange={(event) => setSearch(event.target.value)}
            />
            <p>Search: {games.count} games</p>
          </section>
          {/* Filtres: platform, type, et sort by -----------------------------------------------------------*/}
          {/* ils doivent apparaitre si on rentre une case dans search */}

          {!search ? (
            <div className="homeh1">
              <h1>Most Relevance Games</h1>
            </div>
          ) : (
            <section className="filters">
              <div className="filter1">
                <div>
                  {/* test platform */}
                  {/* <input
                    type="number"
                    min="1"
                    max="18"
                    value={platforms}
                    className="plf"
                    placeholder="Platform"
                    onChange={(event) => setPlatforms(event.target.value)}
                  /> */}
                  {/* {platforms.map((elemPlf, index) => {
                    return (
                      <div key={index}>
                        <Dropdown
                          placeholder="Platform..."
                          options={elemPlf.platforms}
                        />

                        <p>{elem.id}</p>
                      </div>
                    );
                  })} */}

                  {/* test platform */}
                </div>
                <div>
                  <p>Type</p>
                </div>
              </div>
              <div className="filter2">
                <div>
                  <p>sort by</p>
                </div>
                <button>
                  <p>Filters: Go</p>
                </button>
              </div>
            </section>
          )}

          {/* reponse serveur: games du moment --------------------------------------------------------*/}
          <section>
            <GameCard games={games} />
          </section>
          {/* système de pagination ----------------------------------------------------------------*/}
          <section className="pagination">
            <input
              type="number"
              min="1"
              max="25"
              value={page}
              placeholder="page"
              onChange={(event) => setPage(event.target.value)}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default Homepage;
