import axios from "axios";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

//import du sélecteur
import Dropdown from "../components/Dropdown";

import logo1 from "../img/logo1.png";

//page principal sur la quelle apparaissent tous les jeux issu de l'API
const Homepage = () => {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //test ordering ave Dropdown: à voir state intitial+++++++++++++++++++++++++++++++++
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

  const [platforms, setPlatforms] = useState();

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

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        if (platforms) {
          response = await axios.get(
            // requete vers API directe
            `https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2&search=${search}&page=${page}&ordering=${value}&platforms=${platforms}`

            // requete vers le back fonctionne sauf filtres plus besoin de clé Api et requete vers serveur local et plus tard northflank:
            // `http://localhost:3000/games?&search=${search}&page=${page}&value=${value}`
          );
        } else {
          response = await axios.get(
            // requete vers API directe
            `https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2&search=${search}&page=${page}&ordering=${value}`

            // requete vers le back fonctionne sauf filtres plus besoin de clé Api et requete vers serveur local et plus tard northflank:
            // `http://localhost:3000/games?&search=${search}&page=${page}&value=${value}`
          );
        }

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
  }, [search, page, value, platforms]);

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
              <div className="filter2">
                <button
                  onClick={() => {
                    setValue("");
                    setPlatforms();
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
