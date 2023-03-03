import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// il va falloir faire une requete axios en get pour récupérer les favoris en base de données
const Favourites = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //   const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favourites");
        setData(response.data.favourites);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchFavourites();
  }, []);

  return (
    <div className="totFav">
      {isLoading ? (
        <div className="isLoading">
          <h1>En cours de chargement</h1>
        </div>
      ) : (
        <div className="favGlobPage">
          <div className="favBut1">
            <div className="favTitle">
              <h1>My Collection</h1>{" "}
              <button
                onClick={() => {
                  navigate("/games");
                }}
              >
                To Home
              </button>
            </div>
          </div>

          <div className="mapFav">
            {data.map((event, index) => {
              //   if (event.token === token) {
              return (
                <div key={index} className="favPage">
                  <div className="favImg">
                    <img src={event.image} alt="favimg" />
                  </div>
                  <div>
                    <p> {event.name}</p>
                  </div>
                </div>
              );
              //   }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
