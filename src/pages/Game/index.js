import axios from "axios";

//import style.css
import "./style.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import Counter from "../../components/Counter/Counter";

//test carousel photos page home----------------------------------------------------
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
//mais que 2 images présentes et pas en très bonne qualité
//---------------------------------------------------------------------------------

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { counter } from "@fortawesome/fontawesome-svg-core";

const Game = ({ token }) => {
  const navigate = useNavigate();

  const [gameCheck, setGameCheck] = useState({});
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
  const [search, setSearch] = useState("");
  // const [gameSameType, setGameSameType] = useState("");
  const [gameSameType2, setGameSameType2] = useState([]);

  //   recupération de l'id?
  const { id } = useParams();

  //test pour récupérer les reviews selon le jeu
  const [reviews, setReviews] = useState([]);
  // const [counter, setCounter] = useState();

  //test requete user pour review
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //si utilisation Northflank
          `https://site--gamepad-back--zqfvjrr4byql.code.run/games/${id}`

          // `http://localhost:3000/games/${id}`
        );
        setGameCheck(response.data);
        console.log(response.data, "reponse data game");
        setPublisher(response.data.publishers);
        // console.log(response.data.publishers, "reponse data publishers");
        setPlatforms(response.data.platforms);
        // console.log(response.data.platforms, "reponse data platforms");
        setGenre(response.data.genres);
        console.log(response.data.genres);
        setSearch(response.data.name);
        //a mettre en lowercase pour la requete sinon ne passe pas
        // setSearch(response.data.name.toLowerCase());
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
          //si requete se fait versNorthflank
          `https://site--gamepad-back--zqfvjrr4byql.code.run/games?&search=${search}`

          // requete vers le back fonctionne!!!! plus besoin de clé Api et requete vers serveur local et plus tard northflank
          //`http://localhost:3000/games?&search=${search}`
        );
        setGameSameType2(response.data.results);
        // console.log(response.data.results, "************data.results******");

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchGame();
  }, [search]);

  //troisième requete pour récup les reviews du jeu et user avec review--************-******************************
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // si requete vers Northflank au lieu de localhost
        const response = await axios.get(
          "https://site--gamepad-back--zqfvjrr4byql.code.run/user"
        );

        // const response = await axios.get("http://localhost:3000/user");

        setUserReview(response.data.users);
        setIsLoading(false);
        console.log(
          response.data.users,
          "response get user---sur review----------------"
        );
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          // si requete vers Northflank au lieu de localhost
          `https://site--gamepad-back--zqfvjrr4byql.code.run/review`

          // requete vers le back fonctionne!!!! plus besoin de clé Api et requete vers serveur local et plus tard northflank
          // `http://localhost:3000/review`
        );
        setReviews(response.data.reviews);
        console.log(response.data.reviews, "************data reviews******");

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchReviews();
    fetchUser();
  }, []);

  //-******************************-******************************-******************************

  return (
    <div className="gamePage">
      {isLoading ? (
        <div className="isLoading">
          <h1>En cours de chargement</h1>
        </div>
      ) : (
        <div className="gameResult">
          <div className="test5">
            <div>
              <h1>{gameCheck.name}</h1>
            </div>

            <div>
              <button
                onClick={() => {
                  navigate("/games");
                }}
              >
                <FontAwesomeIcon icon="house" />
              </button>
            </div>
          </div>

          {/* pas besoin de map dans ce cas la */}
          <section className="firstGameSection">
            <div className="firstColumn">
              {/* <Carousel> */}
              <img src={gameCheck.background_image} alt="game pic" />
              {/* </Carousel> */}
            </div>
            <div className="secondColumn">
              <div>
                {/* il faut envoyer en favoris au clique le nom et l'image du jeu */}
                {/* le bouton n'apparait que si l'utilisateur est connecté */}

                <div className="items">
                  <button
                    className="favBut"
                    onClick={async () => {
                      if (token) {
                        try {
                          const response = await axios.post(
                            "https://site--gamepad-back--zqfvjrr4byql.code.run/addfavourites",

                            // const response = await axios.post(
                            //   "http://localhost:3000/addfavourites",

                            {
                              name: gameCheck.name,
                              //vérifier le chemib de l'img, pas sur de mon coup
                              image: gameCheck.background_image,
                              //test envoi token
                              token: token,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          alert("Added to Favourites");
                          console.log(response.data);
                        } catch (error) {
                          // il faut gérer l'impossibilité d'ajouter le favori 2 fois de suite dans les favoris
                          console.log(error.message);
                          if (
                            error.message ===
                            "Request failed with status code 409"
                          ) {
                            alert("Favourites already added");
                          }
                        }
                      } else {
                        //ajout state pour revenir sur la page en cours après login ok: on peut cumuler les infos dans state (ici id et logged)
                        navigate("/user/login", {
                          state: { logged: true, id: id },
                        });
                      }
                    }}
                  >
                    Save a collection <FontAwesomeIcon icon="inbox" />
                  </button>

                  {/* il va falloir envoyer par link par exemple l'id du jeu sur la page review, que l'on pourra envoyer à son tour 
                    lors de n'envoi en base de données, comme cela on pourra récupérer l'id avec une requete sur la page game pour 
                    afficher la review du jeu avec un .map avec comme selecteur l'id du jeu (idem favoris*/}

                  {/* response.data.id  ou {gameCheck.id}*/}
                  <div>
                    {token && (
                      <Link
                        key={gameCheck.id}
                        className="reviewLink"
                        to={`/reviews/${gameCheck.name}`}
                      >
                        <button className="addBut">
                          <p> Add a</p>
                          review <FontAwesomeIcon icon="message" />
                        </button>
                      </Link>
                    )}
                  </div>

                  {/* fin test link de add review--------------------- */}
                </div>
              </div>
              <div className="plateformBlock">
                <div className="columnOne">
                  <div className="oneThird">
                    <h1 className="greyText">Plateforms</h1>
                    {/* création d'un nouveau state pour boucler sur le résultat d'un tableau */}
                    <div className="scrolable1">
                      {platforms.map((elem, index) => {
                        return (
                          <div className="platformResult" key={index}>
                            <span>{elem.platform.name}</span>
                          </div>
                        );
                      })}
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
                        // test link pour renvoyer nouvelle requete avec jeu selectionné dans les 5 présents
                        <Link
                          key={elem.id}
                          className="gameCard"
                          to={`/game/${elem.id}`}
                        >
                          <div className="gameCard1">
                            <img src={elem.background_image} alt="picture2" />

                            <div>
                              <h1>{elem.name}</h1>
                            </div>
                          </div>
                        </Link>
                      )
                    );
                  })}
                </div>
                // fin response.data?-------------------------------------*/}
              )}
            </div>
          </section>
          {/* section qui regroupe les reviews-------------------------------- */}
          <section className="reviewSection">
            <h1>Reviews</h1>
            <div className="reviewSection1">
              {reviews.map((item) => {
                return (
                  <div key={item._id}>
                    {item.name === gameCheck.name && (
                      <div>
                        <div className="reviewBox">
                          <div className="toColumn">
                            <div className="toColumnh1">
                              <h1>{item.title}</h1>
                            </div>
                            <div className="toColumnUser">
                              {userReview.map((event, index) => {
                                return (
                                  <div key={index}>
                                    {item.token === event.token && (
                                      <div className="reviewBox1">
                                        <div>
                                          <p>{event.username} </p>
                                        </div>
                                        <div>
                                          <img
                                            src={event.picture.secure_url}
                                            alt="pictureAvatar"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <p>{item.description}</p>
                          {/* <p>{item.count}</p> */}
                          {/* <p>{item._id}</p> */}
                          <div>
                            <Counter
                              count={item.count}
                              id={item._id}
                              setReviews={setReviews}
                              token={token}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Game;
