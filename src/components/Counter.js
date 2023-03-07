//création d'un compsant counter pour augmenter la note des reviews
import { useState, useEffect } from "react";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = () => {
  //-compteur pour noter les reviews*-******************************-*******************
  //il faut déclarer le state dans le composant counter (enfant) pour qu'il soit intégré à la review
  //de manière indépendante (si on clique sur un compteur, seul lui se modifie)
  const [counter, setCounter] = useState(0);
  //----------------------------------------------------------------------------------

  //faire une requete à la base de données pour afficher le count enregistré en base de données

  return (
    <div className="reviewCounter">
      <button
        className="but1Review"
        onClick={() => {
          console.log("jai cliqué sur le bouton");
          setCounter(counter + 1);
        }}
      >
        <FontAwesomeIcon icon="thumbs-up" />
      </button>
      {/* style inline pour changer couleur du bouton selon la note */}
      <p className={counter > 0 ? "green" : "red"}>{counter}</p>
      <button
        className="but2Review"
        onClick={() => {
          console.log("jai cliqué sur le bouton");
          setCounter(counter - 1);
        }}
      >
        <FontAwesomeIcon icon="thumbs-down" />
      </button>
    </div>
  );
};

export default Counter;
