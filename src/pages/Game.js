import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Game = () => {
  const [gameCheck, setGameCheck] = useState("");
  //   bien mettre ("") pour éviter undefined à chargement page
  const [isLoading, setIsLoading] = useState();

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
        <h1>you are on the game page</h1>
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
                <div>
                  <p>Plateforms</p>
                </div>
                <div>
                  <p>Genre</p>
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
