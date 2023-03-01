import logo1 from "../img/logo1.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo1} alt="logo GamePad" />
      </div>
      <div className="powered">
        <p>
          Powered by{" "}
          <span style={{ textDecoration: "underline" }}>Rawg API</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Header;
