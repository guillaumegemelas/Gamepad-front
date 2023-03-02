// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

const GameCard = ({ games }) => {
  //     const slideLeft = () => {
  //     var slider = document.getElementById("slider");
  //     slider.scrollLeft = slider.scrollLeft - 200;
  //   };

  //   const slideRight = () => {
  //     var slider = document.getElementById("slider");
  //     slider.scrollLeft = slider.scrollLeft + 200;
  //   };

  return (
    <div className="gamesResult">
      {games.results.map((elem, index) => {
        return (
          <section key={index}>
            <div>
              <Link className="gameCard" to={`/game/${elem.id}`}>
                <div className="hoverCard">
                  {/* <MdChevronLeft onClick={slideLeft} size={30} /> */}
                  <div id="slider" className="carousel">
                    <img src={elem.background_image} alt="picture1" />

                    {/* {!elem.short_screenshots[1].image ? (
                  <img src={elem.background_image} alt="picture1" />
                ) : (
                  <img src={elem.short_screenshots[1].image} alt="" />
                )} */}

                    {/* <img src={elem.short_screenshots[2].image} alt="" /> */}
                  </div>
                  {/* <MdChevronRight onClick={slideRight} size={30} /> */}
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
