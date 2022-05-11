import React from "react";
import Homepageback from "../assets/Homepageback.jpg";

import "../styles/HomePage.scss";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="left-container">
        <div className="title-desc">
          <h1 className="title">L'application Flore du maroc</h1>
          <h2 className="desc">
            La flore du Maroc est une flore riche et diversifiée, avec environ
            7000 espèces. La flore vasculaire comprend 4200 taxons (espèces et
            sous-espèces), dont 22 % (879 taxons) sont endémiques
          </h2>
          <h3 className="addit-desc">
            Les bois secs méditerranéens à Acacia-Argania se trouvent au sud de
            la zone méditerranéenne. Plus au sud, dans les montagnes de l'Atlas,
            les forêts de conifères et forêts mixtes méditerranéennes dominent.
          </h3>
        </div>
      </div>
      <div className="right-container">
        <div className="img-container">
          <img src={Homepageback} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
