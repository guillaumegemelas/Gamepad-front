import axios from "axios";

import { useEffect, useState } from "react";

const Game = () => {
  const [gameCheck, setGameCheck] = useState();
  const [isLoading, setIsLoading] = useState();

  //   recupération de l'id?

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2"
        );
        setGameCheck(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="gamePage">
      {isLoading ? (
        <h1>you are on the game page</h1>
      ) : (
        <div>page à créer avec l'id du jeu?</div>
      )}
    </div>
  );
};

export default Game;
