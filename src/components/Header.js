import logo1 from "../img/logo1.png";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ handleToken, token }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <Link to={"/"}>
        {" "}
        <div className="logo">
          <img src={logo1} alt="logo GamePad" />
        </div>
      </Link>

      {/* boutons login et signup ----------------------*/}
      <div>
        {token ? (
          <div className="connectButons1">
            <button
              className="but2"
              onClick={() => {
                navigate("/favourites");
              }}
            >
              My Collection
            </button>
            <button
              className="but0"
              onClick={() => {
                handleToken(null);
                navigate("/");
              }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="connectButons">
            <button className="but1" onClick={() => navigate("/user/signup")}>
              Sign up
            </button>

            <button className="but2" onClick={() => navigate("/user/login")}>
              Login
            </button>
          </div>
        )}
      </div>

      {/* --------------------------------------------------- */}

      {/* <div className="powered">
        <p>
          Powered by{" "}
          <span style={{ textDecoration: "underline" }}>Rawg API</span>
        </p>
      </div> */}
    </div>
  );
};

export default Header;
