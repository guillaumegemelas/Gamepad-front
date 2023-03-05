import { Link } from "react-router-dom";
//import Fade pour animation entré icone par la gauche
// import { Fade } from "react-reveal"; renvoie une erreur de compatibilité!! à voir pkoi

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div className="HomeFirst">
      {/* <Fade top> */}
      {/* <img src={kratos} alt="kratosImg" /> */}
      <Link to={`/games`}>
        <div className="buttonHome">
          <div className="icon">
            {/* <FontAwesomeIcon icon="right-to-bracket" /> */}
            <FontAwesomeIcon icon="door-open" />
          </div>
        </div>
      </Link>
      {/* </Fade> */}
    </div>
  );
};

export default Home;
