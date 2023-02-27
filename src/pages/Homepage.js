import axios from "axios";
import { useState, useEffect } from "react";

//page principal sur la quelle apparaissent tous les jeux issu de l'API
const Homepage = () => {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/games?key=b144d325b8cd4cee8a7ad6c204cab7d2"
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
  }, []);

  // j'ai bien une réponse du serveur avec tous les jeux
  return (
    <div>
      <div>Vous êtes sur la Homepage</div>
      {isLoading ? (
        <div>
          <p>En cours de chargement...</p>
        </div>
      ) : (
        <div>
          <p>page chargée</p>
          {games.results.map((elem, index) => {
            return (
              <div key={index}>
                <h1>{elem.name}</h1>
                <h1>{elem.rating}</h1>
                <img
                  style={{ width: 100, height: 100 }}
                  src={elem.background_image}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Homepage;
