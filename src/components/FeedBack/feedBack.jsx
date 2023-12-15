import React from "react";
import "./feedBack.css";

const feedBack = ({ nomeDoUsuario, title, exibir, feedBack = "" }) => {
  return (
    <article className="event-card-feedback">
      <h2 className="event-card__title-feedback">{nomeDoUsuario}</h2>

      <p className="event-card__description-feedback"> {feedBack}</p>

      <span className="exibe-palavra">{exibir}</span>
    </article>
  );
};

export default feedBack;
