import React from "react";
import ImgDeshidratacion from "../Imagenes/DiagramaDeshidratacion.JPG";

function RecetaDeshidratacion(props) {
  return (
    <div>
      <h1 className="ms-3 mt-3 fs-3 title">Proceso de Deshidratación</h1>
      <p className="ms-3 text-start">
        En esta sección se muestra la información del Sub-proceso de
        Deshidratación.
      </p>
      <p className="ms-3 text-start">
        En la etapa del subproceso de deshidratación, se busca obtener un
        producto de elevada concentración de etanol ( mayor 99.5% v/v), retirando el
        agua remanente, bien sea mediante técnicas de adsorción por tamices
        moleculares o también se pueden usar otras técnicas.
      </p>
      <p className="ms-3 text-start">
        Particularmente, en el sub proceso de deshidratación, el alcohol
        rectificado proveniente del sub proceso de destilación, entra a la
        columna evaporadora la cual tiene como finalidad vaporizar el alimento
        líquido y re-destilar la corriente liquida. De la columna de destilación
        se obtienen dos salidas, la primera (flemaza) y un vapor a una
        temperatura de 91°C el cual pasa por un intercambiador de calor y lleva
        la temperatura a 118°C. A continuación de eso el alcohol entra a tamices
        moleculares y se obtiene el producto final de alcohol anhidro a un
        porcentaje de alcohol del 99%.
      </p>
      <div className="text-center w-75 mb-5">
        <img
          src={ImgDeshidratacion}
          className="rounded w-100"
          alt={ImgDeshidratacion}
        />
      </div>
    </div>
  );
}
export { RecetaDeshidratacion };
