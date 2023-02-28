// import { MdChevronLeft, MdChevronRight } from "react-icons/md";

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
          <div className="gameCard" key={index}>
            {/* <p>{elem.id}</p> */}
            {/* <h1>{elem.rating}</h1> */}
            <div>
              {/* <MdChevronLeft onClick={slideLeft} size={30} /> */}
              <div id="slider" className="carousel">
                <img src={elem.background_image} alt="picture1" />
                <img src={elem.short_screenshots[1].image} alt="" />
                <img src={elem.short_screenshots[2].image} alt="" />
              </div>
              {/* <MdChevronRight onClick={slideRight} size={30} /> */}
            </div>

            <h1>{elem.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default GameCard;
