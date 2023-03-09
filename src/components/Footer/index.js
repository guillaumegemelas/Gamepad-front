//import style.css
import "./style.css";

const Footer = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="footer">
      <div>
        <p>
          Made with React by
          <button
            role="link"
            onClick={() => openInNewTab("https://github.com/guillaumegemelas")}
          >
            Guillaume GEMELAS
          </button>
          at
          <button
            role="link"
            onClick={() => openInNewTab("https://www.lereacteur.io")}
          >
            Le Reacteur
          </button>
        </p>
      </div>
      <div>
        <p>
          - Powered by{" "}
          <span style={{ textDecoration: "underline" }}>Rawg API</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
