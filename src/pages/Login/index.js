import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  //tests de redirection vers page publish après connection au lieu de la page home
  const { state } = useLocation();

  let logged;
  if (state) {
    logged = state.logged;
  }

  let id;
  if (state) {
    id = state.id;
    console.log(id, "log de id-----------------");
  }

  const handleLogin = async () => {
    try {
      //si northflank
      // const response = await axios.post("https://site--gamepad-back--zqfvjrr4byql.code.run/user/login", {

      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });
      console.log(response.data);

      if (response.data.token) {
        handleToken(response.data.token);
        alert("Vous êtes maintenant connecté");
        //---------------------------
        logged ? navigate(`/game/${id}`) : navigate("/games");
        //----------------------------
      }
    } catch (error) {
      if (error.response.data.message === "Unknown email") {
        setErrorMessage("Aucun compte ne correspond à cet email");
      }
      if (error.response.data.message === "Wrong password") {
        setErrorMessage("Mot de passe non valide");
      }
    }
  };

  return (
    <div className="signupForm">
      <div className="h1form">
        <h1 style={{ color: "rgb(184, 180, 180)", fontSize: 27 }}>Log in</h1>
      </div>

      <form
        className="formSign1"
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin();
        }}
      >
        <input
          id="email"
          value={email}
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          id="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="inscriptionButton" type="submit">
          Login
        </button>
        <Link to={"/user/signup"}>
          {" "}
          <p style={{ color: "#21a1b3", fontSize: 18 }}>
            No account, please sign up
          </p>
        </Link>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
