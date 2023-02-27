import logo from "../img/logo.jpg";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo GamePad" />
      </div>
    </div>
  );
};

export default Header;
