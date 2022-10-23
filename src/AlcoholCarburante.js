import React from "react";
import ProcesoDual from './Imagenes/ProcesoDual.jpg';

function AlcoholCarburante(props) {
  return (
    <div>
        <h4 className="mt-3 ms-3 Titulos">Proceso de producción Dual de Alcohol Carburante</h4>
        <p className="ms-3 text-start">
          La producción de Alcohol Carburante a partir de caña, puede describirse como un proceso dual compuesto
          por diferentes etapas, desde la recolección de materia prima hasta la producción de Alcohol.
        </p>
        <div className="text-center w-100">
          <img src={ProcesoDual} className="rounded w-100" alt={ProcesoDual}/>
        </div>
    </div>
  );
}

export { AlcoholCarburante };