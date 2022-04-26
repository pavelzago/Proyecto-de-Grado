import React from "react";
import ProcesoDual from './ProcesoDual.JPG';

function AlcoholCarburante(props) {
  return (
    <div>
        <h1 className="mt-3 ms-3 fs-3 subTitle">Proceso de producción Dual de Alcohol Carburante</h1>
        <p className="ms-3 text-start">
          La producción de Alcohol Carburante a partir de caña, puede describirse como un proceso dual compuesto
          por diferentes etapas, desde la recolección de materia prima hasta la producción de Alcohol.
        </p>
        <div className="text-center">
          <img src={ProcesoDual} className="rounded" alt={ProcesoDual}/>
        </div>
    </div>
  );
}

export { AlcoholCarburante };