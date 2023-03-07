import axios from "axios";

//création d'un compsant counter pour augmenter la note des reviews
import { useState } from "react";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = ({ count, id }) => {
  //-compteur pour noter les reviews*-******************************-*******************
  //il faut déclarer le state dans le composant counter (enfant) pour qu'il soit intégré à la review
  //de manière indépendante (si on clique sur un compteur, seul lui se modifie)
  const [counter, setCounter] = useState(count);

  console.log(id, "log de id------------------"); //renvoie bien l'id correspondant à l'annonce
  console.log(count, "log de count----------");

  return (
    <div className="reviewCounter">
      <button
        //   lors de l'appui sur le bouton il va falloir faire une requete pour modifier la review en BDD
        className="but1Review"
        onClick={async () => {
          try {
            const response = await axios.put(
              `http://localhost:3000/review/update/${id}`
            );
            console.log(response.data, "response requete update");
            setCounter(response.data.count);
          } catch (error) {
            console.log(error, "error requete update**************");
          }
        }}
      >
        <FontAwesomeIcon icon="thumbs-up" />
      </button>
      {/* style inline pour changer couleur du bouton selon la note + test pour afficher note de review-----*/}

      <p className={counter > 0 ? "green" : "red"}>{count}</p>
      {/* ------------------------------------------------------------------------------------------------------ */}
      <button
        //   lors de l'appui sur le bouton il va falloir faire une requete pour modifier la review en BDD
        className="but2Review"
        onClick={() => {
          console.log("jai cliqué sur le bouton");
          setCounter(count - 1);
        }}
      >
        <FontAwesomeIcon icon="thumbs-down" />
      </button>
    </div>
  );
};

export default Counter;
