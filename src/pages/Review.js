// import axios from "axios";
// import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//il va falloir faire une requete axios : le bouton add review renvoie à la page review et
//sur la page review après avoir entrer le texte, on publie l'annonce (idem bouton favoris) en BDD

//il va falloir récupérer l'info du jeu pour lequel on veut publier une review: id?
//et le token de la personne qui a publier la review pour afficher la personne qui a mis la note

//il va falloir faire un useEffect avec deux states pour le title et la description et un bouton submit avec
//e.preventdefault() pour enoyer les title et description avec l'id du jeu et le token du user:
const Review = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  console.log(name, "-------id récup de game sur page Review--------------");
  return (
    <div className="mainReview">
      <div className="boxReview">
        <div className="testreview">
          <h1>
            Write a Review for:{" "}
            <span style={{ fontStyle: "italic" }}>{name}</span>
          </h1>
          <button
            onClick={() => {
              navigate("/games");
            }}
          >
            X
          </button>
        </div>

        <div className="boxReview1">
          <p>Review Title</p>
          <textarea name="" id="" cols="40" rows="1"></textarea>
        </div>
        <div className="boxReview2">
          <p>Review Text</p>
          <textarea name="" id="" cols="50" rows="7"></textarea>
        </div>

        <div className="butReview">
          <button
          //il faut envoyer
          //title
          //description
          //token
          //name du jeu récupéré plus haut (au lieu de l'id qui semblait compliqué à envoyer avec mongodb
          //qui donne une id propre à une review et pas à une review d'un jeu)
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
