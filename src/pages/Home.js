import { Link } from "react-router-dom";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div className="HomeFirst">
      {/* <img src={kratos} alt="kratosImg" /> */}
      <Link to={`/games`}>
        <div className="buttonHome">
          <div className="icon">
            {/* <FontAwesomeIcon icon="right-to-bracket" /> */}
            <FontAwesomeIcon icon="door-open" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
