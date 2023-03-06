import { Link } from "react-router-dom";

const GameCard = ({ games }) => {
  return (
    <div className="gamesResult">
      {games.results.map((elem, index) => {
        return (
          <section key={index}>
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
