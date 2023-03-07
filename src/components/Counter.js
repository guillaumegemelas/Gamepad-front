import axios from "axios";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = ({ count, id, setReviews, token }) => {
  //-compteur pour noter les reviews*-******************************-*******************
  //il faut déclarer le state dans le composant counter (enfant) pour qu'il soit intégré à la review
  //de manière indépendante (si on clique sur un compteur, seul lui se modifie)
  //   const [counter, setCounter] = useState(0);

  console.log(id, "log de id------------------"); //renvoie bien l'id correspondant à l'annonce
  console.log(count, "log de count----------");

  return (
    <div>
      {token && (
        <div className="reviewCounter">
          <button
            //   lors de l'appui sur le bouton il va falloir faire une requete pour modifier la review en BDD
            className="but1Review"
            onClick={async () => {
              try {
                const response = await axios.put(
                  `http://localhost:3000/review/update1/${id}`
                  //   {
                  //     headers: {
                  //       Authorization: `Bearer ${token}`,
                  //     },
                  //   }
                );
                console.log(response.data, "response requete update");
                setReviews(response.data.reviews);
              } catch (error) {
                console.log(error, "error requete update**************");
              }
            }}
          >
            <FontAwesomeIcon icon="thumbs-up" />
          </button>
          {/* style inline pour changer couleur du bouton selon la note + test pour afficher note de review-----*/}

          <p className={count > 0 ? "green" : "red"}>{count}</p>
          {/* ------------------------------------------------------------------------------------------------------ */}
          <button
            //   lors de l'appui sur le bouton il va falloir faire une requete pour modifier la review en BDD
            className="but2Review"
            onClick={async () => {
              try {
                const response = await axios.put(
                  `http://localhost:3000/review/update2/${id}`
                  //   {
                  //     headers: {
                  //       Authorization: `Bearer ${token}`,
                  //     },
                  //   }
                );
                console.log(response.data, "response requete update");
                // bien mettre setReviews avec response du back pour mise à jour du count suite au clic
                setReviews(response.data.reviews);
              } catch (error) {
                console.log(error, "error requete update**************");
              }
            }}
          >
            <FontAwesomeIcon icon="thumbs-down" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Counter;
