import React from "react";
import ImgFermCont from "../Imagenes/ProcesoFermentacionCont.JPG";

function RecetaFermentacion(props) {
  return (
    <div>
      <h1 className="ms-3 mt-3 fs-3 title">Proceso de Fermentación</h1>
      <p className="ms-3 text-start">
        En esta sección se muestra la información del Sub-proceso de
        fermentación.
      </p>
      <p className="ms-3 text-start">
        Inicialmente, para la producción de alcohol carburante la materia prima
        es la Miel B, inicialmente en la primera etapa pasa por el proceso de
        fermentación, en donde a través de unos fermentadores, almacenan toda la
        materia prima proveniente del tacho y junto con los ingredientes del
        proceso de fermentación inicia el proceso de fermentación continua,
        mediante el cual se convierten los azucares en etanol.
      </p>
      <p className="ms-3 text-start">
        Esté proceso bioquímico se divide en dos subprocesos fundamentales, la
        propagación de levaduras y la fermentación de la materia prima. La
        propagación de levaduras consiste en tener una población inicial de
        levadura, y por medio de adicción de sustancias asignarle unas
        condiciones iniciales. Dichas condiciones contribuyen al crecimiento de
        la población celular, aumentando la biomasa. Esta es producida en el
        proceso de propagación, es ingresada a los reactores para comenzar la
        operación de conversión de biomasa en etanol carburante; llevada a cabo
        por medio de la levadura saccharomyces Cereviscie.
      </p>
      <div className="text-center w-50">
        <img src={ImgFermCont} className="rounded w-100" alt={ImgFermCont} />
      </div>
    </div>
  );
}
export { RecetaFermentacion };
