import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Game = () => {
  const [gameCheck, setGameCheck] = useState("");
  //   bien mettre ("") pour éviter undefined à chargement page
  const [isLoading, setIsLoading] = useState();
  //state platforms
  const [platforms, setPlatforms] = useState([]);
  //state publisher
  const [publisher, setPublisher] = useState([]);
  //state genre
  const [genre, setGenre] = useState([]);
  //state developer
  const [developer, setDeveloper] = useState([]);

  //   recupération de l'id?
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=b144d325b8cd4cee8a7ad6c204cab7d2`
        );
        setGameCheck(response.data);
        console.log(response.data, "reponse data game");
        setPublisher(response.data.publishers);
        // console.log(response.data.publishers, "reponse data publishers");
        setPlatforms(response.data.platforms);
        // console.log(response.data.platforms, "reponse data platforms");
        setGenre(response.data.genres);
        // console.log(response.data.genres);
        setDeveloper(response.data.developers);
        // console.log(response.data.developers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="gamePage">
      {isLoading ? (
        <div className="isLoading">
          <h1>En cours de chargement</h1>
        </div>
      ) : (
        <div className="gameResult">
          <h1>{gameCheck.name}</h1>
          {/* pas besoin de map dans ce cas la */}
          <section className="firstGameSection">
            <div className="firstColumn">
              <img src={gameCheck.background_image} alt="game pic" />
            </div>
            <div className="secondColumn">
              <div className="items">
                <button>
                  Save a collection <FontAwesomeIcon icon="inbox" />
                </button>
                <button>
                  <p> Add a</p>
                  review <FontAwesomeIcon icon="message" />
                </button>
              </div>
              <div className="plateformBlock">
                <div className="columnOne">
                  <div className="oneThird">
                    <h1 className="greyText">Plateforms</h1>
                    {/* création d'un nouveau state pour boucler sur le résultat d'un tableau */}
                    <div className="scrolable1">
                      {platforms.map((elem, index) => {
                        //   if (index % 5 === 0)
                        return (
                          <div className="platformResult" key={index}>
                            <span>{elem.platform.name}</span>
                          </div>
                        );
                      })}{" "}
                    </div>
                  </div>
                  <div className="oneThird">
                    <h1 className="greyText">Released date</h1>
                    <p>{gameCheck.released}</p>
                  </div>
                  <div className="oneThird">
                    <h1 className="greyText">Publisher</h1>

                    {publisher.map((elem, index) => {
                      return (
                        <div className="platformResult" key={index}>
                          <p>{elem.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="columnTwo">
                  <div className="oneThird">
                    <h1 className="greyText">Genre</h1>
                    {genre.map((elem, index) => {
                      return (
                        <div className="platformResult" key={index}>
                          <p>{elem.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="oneThird">
                    <h1 className="greyText">Developer</h1>
                    {developer.map((elem, index) => {
                      return (
                        <div className="platformResult" key={index}>
                          <p>{elem.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="oneThird">
                    <h1 className="greyText">Rating</h1>
                    <p>{gameCheck.rating}</p>
                  </div>
                </div>
              </div>
              <div className="about">
                <h1 className="greyText">About</h1>
                <div ellipsizeMode="tail" className="scrolable">
                  <p>{gameCheck.description_raw}</p>
                </div>
              </div>
            </div>
          </section>
          {/* seconde section: jeux similaires au jeu choisi */}
          <section className="similarGames">
            <h1>Games like {gameCheck.name}</h1>

            <div>
              {/* il trouver 5 jeux similaires au jeu en question
                map sur response.data? */}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Game;
