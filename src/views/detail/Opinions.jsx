import React from "react";
import "./OpinionList.css"; // Importa el archivo CSS
import img from "./DAYT2F5NUNB7VPAFKUPHNDXVQA.avif";

const OpinionList = ({ opinions }) => {
  return (
    <details className="opinion-list">
      <summary className="opinion-list__summary">
        Product reviews ({opinions.length})
      </summary>
      <ul className="opinion-list__items">
        {opinions.map((opinion, index) => (
          <div key={index} className="opinion-list__item">
            <div>

            <img
              src={img}
              style={{ width: "70px", height: "70px", marginRight: "50px"}}
              alt="imagen de usuario"
              />
            {opinion.name}, {opinion.opinion}
              </div>
          </div>
        ))}
      </ul>
    </details>
  );
};

export default OpinionList;
