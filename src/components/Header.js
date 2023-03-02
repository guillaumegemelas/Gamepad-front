import logo1 from "../img/logo1.png";
import { useNavigate } from "react-router-dom";

const Header = ({ handleToken, token }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo">
        <img src={logo1} alt="logo GamePad" />
      </div>
      {/* boutons login et signup ----------------------*/}
      <div className="connectButons1">
        {token ? (
          <button
            className="but0"
            onClick={() => {
              handleToken(null);
              navigate("/");
            }}
          >
            Disconnect
          </button>
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
