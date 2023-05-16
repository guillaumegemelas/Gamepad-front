import { Link } from "react-router-dom";

//import pour les composants class
import { Component } from "react";

//import style.css
import "./style.css";

//composant class au lieu de composant fonctionnel
class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { games } = this.props;
    return (
      <div className="gamesResult">
        {games.results.map((elem) => {
          return (
            <section key={elem.id}>
              <Link className="gameCard" to={`/game/${elem.id}`}>
                <div className="hoverCard">
                  <div id="slider" className="carousel">
                    <img src={elem.background_image} alt="picture1" />
                  </div>
                </div>

                <h1>{elem.name}</h1>
              </Link>
            </section>
          );
        })}
      </div>
    );
  }
}

// const GameCard = ({ games }) => {
//   return (
//     <div className="gamesResult">
//       {games.results.map((elem) => {
//         return (
//           <section key={elem.id}>
//             <Link className="gameCard" to={`/game/${elem.id}`}>
//               <div className="hoverCard">
//                 <div id="slider" className="carousel">
//                   <img src={elem.background_image} alt="picture1" />
//                 </div>
//               </div>

//               <h1>{elem.name}</h1>
//             </Link>
//           </section>
//         );
//       })}
//     </div>
//   );
// };

export default GameCard;
