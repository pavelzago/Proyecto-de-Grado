import React from "react";
import ImgDestilacion from "../Imagenes/DiagramaDestilacion.JPG";

function RecetaDestilacion(props) {
  return (
    <div>
      <h1 className="ms-3 mt-3 fs-3 title">Proceso de Destilación</h1>
      <p className="ms-3 text-start">
        En esta sección se muestra la información del Sub-proceso de
        Destilación.
      </p>
      <p className="ms-3 text-start">
        El subproceso de destilación consiste en separar por diferencias en los
        puntos de ebullición de los componentes de una mezcla, que al ser
        sometidos al calor los compuestos más volátiles como el alcohol se
        evaporan y se concentran en fase de vapor.
      </p>
      <p className="ms-3 text-start">
        En la destilación se calienta el mosto fermentado con el fin de evaporar
        el etanol y obtener alcohol con una pureza del 98.5%. El mosto que
        proviene de la sección de fermentación que contiene aproximadamente
        10,5% de etanol, además de agua, gases, solidos disueltos y otros
        compuestos que deben retirarse.
      </p>
      <p className="ms-3 text-start">
        La columna mostera se obtienen 3 productos, por la parte superior se
        obtienen vapores livianos con que van a la columna de aldehídos para
        obtener el alcohol impuro con concentración del 96% de etanol, por la
        parte intermedia se obtienen gases con una concentración de alcohol
        entre el 40-50% que se envían a la columna rectificadora para obtener
        alcohol del 96% de etanol y por la parte inferior la columna se obtiene
        una corriente liquida llamada vinaza.
      </p>
      <div className="text-center w-75">
        <img
          src={ImgDestilacion}
          className="rounded w-100"
          alt={ImgDestilacion}
        />
      </div>
      <p className="ms-3 mt-3 text-start">
        A continuación, se describen los elementos relevantes del subproceso de
        destilación: 1. Columna desgasificadora: Esta es usada para eliminar los
        gases disueltos principalmente CO2, incondensables y los compuestos más
        livianos como acetaldehído y acetato de etilo. Los vapores de la cima
        son enviados hacia la columna de aldehídos con el fin de separar los
        compuestos livianos.
      </p>
      <p className="ms-3 text-start">
        2. Columna despojadora: Recibe el vino de la columna desgasificadora y
        se encarga de agotar el etanol hasta aproximadamente 0.05% p/p en el
        fondo de la columna. Como producto se obtiene una corriente de cima con
        vapores de alcohol diluido entre 40-50%, son enviados a la columna
        rectificadora.
      </p>
      <p className="ms-3 text-start">
        3. Columna aldehídos: Se encarga de recuperar el alcohol remanente en la
        corriente de fondo y retornarlo a la columna de rectificación, mientras
        que por la cima de la columna se logra concentrar las impurezas
        livianas, las cuales son retiradas del sistema mediante una pequeña
        extracción.
      </p>
      <p className="ms-3 text-start mb-3">
        4. Columna rectificadora: Se alimenta con los vapores diluidos de etanol
        que se obtienen de la cima de la columna despojadora para obtener
        alcohol con una concentración del 96% v/v en la cima de la columna. Para
        garantizar eliminar la mayor cantidad de impurezas se realizan purgas;
        el producto de esas purgas se lo conoce como aceite fusel.
        Principalmente se realizan dos extracciones denominas fusel liviano y
        pesado que contienen alcoholes superiores como alcohol isoamílico,
        butanol, isobutanol, isopropanol y propanol.
      </p>
    </div>
  );
}
export { RecetaDestilacion };
