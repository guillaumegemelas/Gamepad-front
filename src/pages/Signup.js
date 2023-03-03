import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    setErrorMessage("");

    try {
      const response = await axios.post(
        //requete qu'il faudra changer lorsque le site sera hebergé sur Northflank
        "http://localhost:3000/user/signup",
        {
          username: username,
          email: email,
          password: password,
          passwordConf: passwordConf,
        }
      );

      if (response.data.token) {
        handleToken(response.data.token);
        alert("Votre compte a été créé");
        navigate("/games");
      }
    } catch (error) {
      console.log(error.response.data, "erreur signup 🤒");
      if (error.response.data.message === "This email is already used") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un email valide"
        );
      }
      if (error.response.data.message === "This username is already used") {
        setErrorMessage(
          "Ce nom d'utilisateur est déjà utilisé, veuillez créer un compte avec un nom d'utilisateur valide"
        );
      }
      if (error.response.data.message === "Missing parameter") {
        setErrorMessage("Veuillez remplir tous les champs s'il vous plaît");
      }
      if (error.response.data.message === "Passwords are different") {
        setErrorMessage("Veuillez renseigner deux mots de passe identiques");
      }
    }
  };

  return (
    <div className="signupForm">
      <div>
        <h1 style={{ color: "rgb(184, 180, 180)", fontSize: 27 }}>Sign up</h1>
      </div>

      <form
        className="formSign"
        onSubmit={(event) => {
          event.preventDefault();
          handleSignup();
        }}
      >
        <input
          id="username"
          value={username}
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
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
        <input
          id="passwordConf"
          value={passwordConf}
          type="password"
          placeholder="Confirm Password"
          onChange={(event) => setPasswordConf(event.target.value)}
        />
        <button className="inscriptionButton" type="submit">
          Sign up
        </button>
        <Link to={"/user/login"}>
          {" "}
          <p style={{ color: "#21a1b3", fontSize: 18 }}>
            Already have an account, please log in
          </p>
        </Link>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;