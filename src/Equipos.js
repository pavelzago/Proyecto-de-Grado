import React from "react";
import { EqFermentacion } from "./Equipos/EqFermentacion";
import ImgPlanta from "./Imagenes/PlantaTotal.JPG";

function Equipos() {
  return (
    <div>
      <h1 className="mt-3 ms-3 title">Equipos y Procesos</h1>
      <p className="ms-3 text-start">
        La producción de Alcohol Carburante a partir de caña, puede englobarse
        en tres sub-procesos que están compuestos por las etapas de
        fermentación, destilación y deshidratación. A continuación información
        de los equipos de cada sub-proceso y el diagrama esquemático de la planta de producción:
      </p>
      <div className="text-center w-50">
        <img src={ImgPlanta} className="rounded w-100" alt={ImgPlanta} />
      </div>
      <div><EqFermentacion/></div>

    </div>
  );
}

export { Equipos };