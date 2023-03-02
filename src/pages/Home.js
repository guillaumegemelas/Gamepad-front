import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="HomeFirst">
      {/* <img src={kratos} alt="kratosImg" /> */}
      <Link to={`/games`}>
        <div className="buttonHome">
          <p>Let start</p>
        </div>
      </Link>
    </div>
  );
};

export default Home;
