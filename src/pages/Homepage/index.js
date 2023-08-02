import axios from "axios";

//import style.css
import "./style.css";

// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "../../components/Gamecard/GameCard";
// import { Navigate } from "react-router-dom";

//import du sélecteur
import Dropdown from "../../components/Dropdown";

import logo1 from "../Homepage/logo1.png";

//page principal sur la quelle apparaissent tous les jeux issu de l'API
const Homepage = () => {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //test ordering avec Dropdown: à voir state intitial+++++++++++++++++++++++++++++++++
  const [value, setValue] = useState("");

  const options = [
    { label: "Default", value: "" },
    { label: "Rating", value: "-rating" },
    { label: "Date", value: "-added" },
    { label: "Name", value: "name" },
  ];
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //++test select by platform++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [platforms, setPlatforms] = useState("");

  const optionsPlf = [
    { label: "Default", value: "" },
    { label: "PS5", value: "187" },
    { label: "Xbox Serie X", value: "186" },
    { label: "PS4", value: "18" },
    { label: "PS3", value: "16" },
    { label: "Xbox 360", value: "14" },
    { label: "Xbox One", value: "1" },
  ];
  const handleChangePlf = (event) => {
    setPlatforms(event.target.value);
  };

  //++test select by genre++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [genres, setGenres] = useState("");

  const optionsGen = [
    { label: "Default", value: "" },
    { label: "Action", value: "action" },
    { label: "Indie", value: "indie" },
    { label: "Adventure", value: "adventure" },
    { label: "RPG", value: "role-playing-games-rpg" },
    { label: "Strategy", value: "strategy" },
    { label: "Shooter", value: "shooter" },
    { label: "Casual", value: "casual" },
    { label: "Simulation", value: "simulation" },
    { label: "Puzzle", value: "puzzle" },
    { label: "Arcade", value: "arcade" },
    { label: "Platformer", value: "platformer" },
    { label: "Racing", value: "racing" },
    { label: "Sports", value: "sports" },
    { label: "Fighting", value: "fighting" },
    { label: "Family", value: "family" },
    { label: "Educational", value: "educational" },
    { label: "Card", value: "card" },
  ];
  const handleChangeGen = (event) => {
    setGenres(event.target.value);
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  useEffect(() => {
    //implémentation d'un abortcontroller:pour annuler la requête en cours si le composant est démonté ou si une nouvelle requête est déclenchée avant que la précédente ne soit terminée.
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      let response;
      try {
        //requete avec condition car si string vide au niveau du state plf (rien de renseigné), 0 jeux affichés donc obligé de dire si !plf alors
        //requete sans tenir compte de plaforms=${platforms}
        if (platforms && genres) {
          response = await axios.get(
            // requete vers Northflank
            `https://site--gamepad-back--zqfvjrr4byql.code.run/games?&search=${search}&page=${page}&value=${value}&platforms=${platforms}&genres=${genres}`,
            {
              cancelToken: signal.token,
            }
            // requete vers le back fonctionne sauf filtres plus besoin de clé Api et requete vers serveur local et plus tard northflank:
            //`http://localhost:3000/games?&search=${search}&page=${page}&value=${value}&platforms=${platforms}&genres=${genres}`
          );
        } else if (platforms && !genres) {
          response = await axios.get(
            // requete vers Northflank
            `https://site--gamepad-back--zqfvjrr4byql.code.run/games?&search=${search}&page=${page}&value=${value}&platforms=${platforms}`,
            {
              cancelToken: signal.token,
            }

            // requete vers le back fonctionne sauf filtres plus besoin de clé Api et requete vers serveur local et plus tard northflank:
            //`http://localhost:3000/games?&search=${search}&page=${page}&value=${value}&platforms=${platforms}`
          );
        } else if (!platforms && genres) {
          response = await axios.get(
            // requete vers Northflank
            `https://site--gamepad-back--zqfvjrr4byql.code.run/games?&search=${search}&page=${page}&value=${value}&genres=${genres}`,
            {
              cancelToken: signal.token,
            }

            // requete vers le back fonctionne sauf filtres plus besoin de clé Api et requete vers serveur local et plus tard northflank:
            //`http://localhost:3000/games?&search=${search}&page=${page}&value=${value}&genres=${genres}`
          );
        } else {
          response = await axios.get(
            `https://site--gamepad-back--zqfvjrr4byql.code.run/games?search=${search}&page=${page}&value=${value}`,
            {
              cancelToken: signal.token,
            }

            // requete vers le back fonctionne sauf filtres plus besoin de clé Api et requete vers serveur local et plus tard northflank:
            //`http://localhost:3000/games?&search=${search}&page=${page}&value=${value}`
          );
        }

        setGames(response.data);

        console.log(response.data, "response data");
        //renvoie les résultats de la requete à l'API
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
        } else {
          console.error("error fetching data:", error);
        }
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [search, page, value, platforms, genres]);

  // j'ai bien une réponse du serveur avec tous les jeux
  return (
    <div className="Home">
      {isLoading ? (
        <div className="isLoading">
          <h1>En cours de chargement</h1>
        </div>
      ) : (
        <div className="global">
          {/* searchbar: filtre par nom --------------------------------------------------------*/}
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
            <p className="search1">
              Search{"  "}
              {search && (
                <span>
                  Results for{" "}
                  <span
                    className="test"
                    style={{
                      fontStyle: "italic",
                      textDecoration: "#21a1b3 underline 1px",
                    }}
                  >
                    "{search}"
                  </span>
                  <span> ✔︎ </span>
                </span>
              )}{" "}
              {games.count} games
            </p>
          </section>
          {/* Filtres: platform, type, et sort by -----------------------------------------------------------*/}
          {/* ils doivent apparaitre si on rentre une case dans search */}

          {!search ? (
            <div className="homeh1">
              <h1>Most Relevance Games</h1>
            </div>
          ) : (
            <section className="filters">
              <div className="filters1">
                <div className="dropdown">
                  <Dropdown
                    className="dropdown1"
                    label="Sort by"
                    options={options}
                    value={value}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="dropdown">
                {/* test dropdowm plf */}
                <Dropdown
                  className="dropdown1"
                  label="Platform"
                  options={optionsPlf}
                  value={value}
                  onChange={handleChangePlf}
                />

                {/* test  dropdown */}
              </div>
              <div className="dropdown">
                <Dropdown
                  className="dropdown1"
                  label="Genre"
                  options={optionsGen}
                  value={value}
                  onChange={handleChangeGen}
                />
              </div>
              <div className="filter2">
                <button
                  onClick={() => {
                    setValue("");
                    setPlatforms("");
                    setGenres("");
                    // pour refresh la page et mettre les states à default: méthode à défaut de mieux
                    window.location.reload();
                  }}
                >
                  <p>reset filters</p>
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
              max="30"
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
