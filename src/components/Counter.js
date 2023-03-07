import axios from "axios";

//création d'un compsant counter pour augmenter la note des reviews
import { useState, useEffect } from "react";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = ({ gameCheck }) => {
  //-compteur pour noter les reviews*-******************************-*******************
  //il faut déclarer le state dans le composant counter (enfant) pour qu'il soit intégré à la review
  //de manière indépendante (si on clique sur un compteur, seul lui se modifie)
  const [counter, setCounter] = useState(0);
  //----------------------------------------------------------------------------------

  //faire une requete à la base de données pour afficher le count enregistré en base de données
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState([]);
  //   const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/review`);
        setReviews(response.data.reviews);
        // console.log(
        //   response.data.reviews,
        //   "************data reviews on page counter******"
        // );

        // setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchReviews();
  }, []);
  //Quatrième requete pour récup user avec review--******************************-******************************
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setUserReview(response.data.users);
        // setIsLoading(false);
        // console.log(
        //   response.data.users,
        //   "response get user---sur review----------------"
        // );
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchUser();
  }, []);

  //-******************************-******************************-******************************

  return (
    <div className="reviewCounter">
      <button
        //   lors de l'appui sur le bouton il va falloir faire une requete pour modifier la review en BDD
        className="but1Review"
        onClick={() => {
          console.log("jai cliqué sur le bouton");
          setCounter(counter + 1);
        }}
      >
        <FontAwesomeIcon icon="thumbs-up" />
      </button>
      {/* style inline pour changer couleur du bouton selon la note + test pour afficher note de review-----*/}

      {/* je map sur l'ensemble des reviews présentes en BDD */}
      {reviews.map((item) => {
        console.log(item, "item review page++++++++++++++++++++++++");
        console.log(item._id, "item id .map");
        console.log(item.count, "item count .map");
        console.log(gameCheck.name, "gameCheck.name"); //affiche le nom du jeu ou sont les reviews (ok)
        console.log(item.name, "item.name"); //ceci est le nom qu'il faut matcher
        console.log(item.token, "token de item*******"); //token de l'user
        // affiche l'id de la review!
        return (
          <div key={item._id}>
            {/* je dis si gameCheck.name est égale au name présent dans la boucle du map, j'ai les reviews correspondant au jeu */}
            {item.name === gameCheck.name && (
              <div>
                {/* il faut ensuite trier par user grâce au token du user pour avoir la reviex du jeu correspondant au user */}
                {userReview.map((event, index) => {
                  console.log(event, "event review page++++++++++++++++++");
                  return (
                    <div key={index} className="reviewBox1">
                      {item.token === event.token && (
                        <div>
                          {/* le problème est qu'on affiche toutes les notes du jeu et pas celle qui concerne la review */}
                          <p>{item.count}</p>
                          <p className={counter > 0 ? "green" : "red"}>
                            {counter}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {reviews.map((item) => {
        console.log(item._id);
        console.log(item.count);
        console.log(gameCheck.name, "gameCheck.name"); //affiche le nom du jeu ou sont les reviews
        console.log(item.name, "item.name"); //c'est ok les deux matchs sur le meme nom
        console.log(item.token, "token de item*******");
        // affiche l'id de la review!
        return (
          <div key={item._id}>
            {item.name === gameCheck.name && (
              <div>
                {userReview.map((event, index) => {
                  console.log(event, "event review page++++++++++++++++++");
                  return (
                    <div key={index} className="reviewBox1">
                      {item.token === event.token && (
                        <div>
                          {/* le problème est qu'on affiche toutes les notes du jeu et pas celle qui concerne la review */}
                          <p>{item.count}</p>
                          <p className={counter > 0 ? "green" : "red"}>
                            {counter}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <p className={counter > 0 ? "green" : "red"}>{counter}</p>
      {/* ------------------------------------------------------------------------------------------------------ */}
      <button
        //   lors de l'appui sur le bouton il va falloir faire une requete pour modifier la review en BDD
        className="but2Review"
        onClick={() => {
          console.log("jai cliqué sur le bouton");
          setCounter(counter - 1);
        }}
      >
        <FontAwesomeIcon icon="thumbs-down" />
      </button>
    </div>
  );
};

export default Counter;
