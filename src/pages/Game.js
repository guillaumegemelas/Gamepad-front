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
        console.log(response.data.publishers, "reponse data publishers");
        setPlatforms(response.data.platforms);
        console.log(response.data.platforms, "reponse data platforms");
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
                  <div>
                    <h1 className="greyText">Plateforms</h1>
                    {/* création d'un nouveau state pour boucler sur le résultat d'un tableau */}
                    {platforms.map((elem, index) => {
                      return (
                        <div className="platformResult" key={index}>
                          <p>{elem.platform.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h1 className="greyText">Released date</h1>
                    <p>{gameCheck.released}</p>
                  </div>
                  <div>
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

                <div>
                  <p className="greyText">Genre</p>
                  {/* <p>{gameCheck.genres}</p> */}
                </div>
              </div>
              {/* <p>{gameCheck.description_raw}</p> */}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Game;
