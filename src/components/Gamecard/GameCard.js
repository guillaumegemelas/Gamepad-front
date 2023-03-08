import { Link } from "react-router-dom";

//import style.css
import "./style.css";

const GameCard = ({ games }) => {
  return (
    <div className="gamesResult">
      {games.results.map((elem) => {
        return (
          <section key={elem.id}>
            <div>
              <Link className="gameCard" to={`/game/${elem.id}`}>
                <div className="hoverCard">
                  <div id="slider" className="carousel">
                    <img src={elem.background_image} alt="picture1" />
                  </div>
                </div>

                <h1>{elem.name}</h1>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default GameCard;
