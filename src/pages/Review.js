// import axios from "axios";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//il va falloir faire une requete axios : le bouton add review renvoie à la page review et
//sur la page review après avoir entrer le texte, on publie l'annonce (idem bouton favoris) en BDD

//il va falloir récupérer l'info du jeu pour lequel on veut publier une review: id?
//et le token de la personne qui a publier la review pour afficher la personne qui a mis la note
const Review = () => {
  const navigate = useNavigate();
  return (
    <div className="mainReview">
      <div className="boxReview">
        <div className="testreview">
          <h1>Write a Review</h1>
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
          <button>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default Review;
