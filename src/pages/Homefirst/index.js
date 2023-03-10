import { Link } from "react-router-dom";

//import style.css
import "./style.css";

//pour les effets d'animation
import { Fade } from "react-awesome-reveal";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div className="HomeFirst">
      <Fade left>
        {" "}
        {/* <img src={kratos} alt="kratosImg" /> */}
        <Link to={`/games`}>
          <div className="buttonHome">
            <div className="icon">
              {/* <FontAwesomeIcon icon="right-to-bracket" /> */}
              <FontAwesomeIcon icon="door-open" />
            </div>
          </div>
        </Link>
      </Fade>
    </div>
  );
};

export default Home;
