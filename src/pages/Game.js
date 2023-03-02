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
  //state pour seconde requete
  const [gameSameType, setGameSameType] = useState("");
  const [gameSameType2, setGameSameType2] = useState([]);

  // const randomNumber = Math.floor(Math.random() * (20000 - 1)) + 1;
  // console.log(randomNumber);

  //   recupération de l'id?
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=b144d325b8cd4cee8a7ad6c204cab7d2`
        );
        setGameCheck(response.data);
        // console.log(response.data, "reponse data game");
        setPublisher(response.data.publishers);
        // console.log(response.data.publishers, "reponse data publishers");
        setPlatforms(response.data.platforms);
        // console.log(response.data.platforms, "reponse data platforms");
        setGenre(response.data.genres);
        console.log(response.data.genres);
        //a mettre en lowercase pour la requete sinon ne passe pas
        setGameSameType(response.data.name.toLowerCase());
        console.log(
          response.data.genres[0].name,
          "first requete------------------"
        );
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

  //test seconde requete pour ajouter 5 jeux du même genre----------------------------

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2&search=${gameSameType}`

          // requete vers le back fonctionne!!!! plus besoin de clé Api et requete vers serveur local et plus tard northflank
          // `http://localhost:3000/games?search=${gameSameType}`

          //requete par genre de jeu (ex: action): obsolète
          // `https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2&genres=${gameSameType}`
        );
        setGameSameType2(response.data.results);
        console.log(response.data.results, "************data.results******");
        // console.log(gameSameType, "second requete------+ + + + +----");
        // console.log(response.data, "reponse data game Type");

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchGame();
  }, [gameSameType]);

  //test seconde requete pour ajouter 5 jeux du même genre----------------------------

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
                <div ellipsizemode="tail" className="scrolable">
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
                map sur response.data?-------------------------------------*/}
              {gameSameType2.length !== 0 && (
                <div className="gamesPickUp">
                  {/* OK mais renvoie tjs l'index de 1 à 5 au lieu d'un pick aléatoire, index compris entre 
                  2 et 6 pour éviter que le résultat renvoi l'index 1 qui correspond au jeu  présenté */}
                  {gameSameType2.map((elem, index) => {
                    return (
                      index > 1 &&
                      index < 7 && (
                        <div key={elem.id} className="gameCard1">
                          <img src={elem.background_image} alt="picture2" />

                          <div>
                            <h1>{elem.name}</h1>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
                // fin response.data?-------------------------------------*/}
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Game;
