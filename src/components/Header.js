import logo1 from "../img/logo1.png";
import { useNavigate, Link } from "react-router-dom";

//imports pour ajout name du user
import axios from "axios";
import { useEffect, useState } from "react";
//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//-----------------------

const Header = ({ handleToken, token }) => {
  const navigate = useNavigate();
  // ajout requete axios vers back pour récupérer les infos du user loggué------------------
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setData(response.data.users);
        setIsLoading(false);
        console.log(
          response.data.users,
          "response get user-------------------"
        );
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchUser();
  }, []);

  //------------------

  return (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <div className="header">
          <Link to={"/"}>
            <div className="logo">
              <img src={logo1} alt="logo GamePad" />
            </div>
          </Link>

          {/* boutons login et signup ----------------------*/}
          <div>
            {token ? (
              <div className="connectButons1">
                <div className="connectUser1">
                  {/* test get user---------------------------- */}
                  {data.map((item, index) => {
                    // console.log(item.username, "----------username user");
                    // console.log(item.token, "---------token user");
                    return (
                      <div key={index}>
                        {token === item.token && (
                          <div className="connectUser">
                            <span>
                              <FontAwesomeIcon icon="face-grin-wide" />
                            </span>
                            <p>{item.username}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* test get user---------------------------- */}
                </div>

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
                <button
                  className="but1"
                  onClick={() => navigate("/user/signup")}
                >
                  Sign up
                </button>

                <button
                  className="but2"
                  onClick={() => navigate("/user/login")}
                >
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
      )}
    </div>
  );
};

export default Header;
