import React from "react";
import ImgProcesoAC from './Imagenes/Subprocesos.JPG';

function Inicio() {
  return (
    <div className="container">
      <div>
        <h2 className="mt-5 Titulos">Sistema de Gestión</h2>
        <p className="mt-3 w-75 Titulos">
          El presente sistema tiene como objetivo la implementación del
          aplicativo de gestión (MES), para el proceso de alcohol carburante y
          el cuál tiene en cuenta las recomendaciones de la normativa ISA-95
          para su integración con los diferentes niveles de la pirámide de
          automatización. La conjunción de estas características busca
          relacionar las diferentes áreas del proceso, con el fin de facilitar
          el flujo de datos y la relación de las funciones empresariales. 
          </p>
          <p className="mt-3 w-75 Titulos">  
          Para ello, la normativa ISA-95 se ha desarrollado para facilitar y/o guiar
          en la integración de los diferentes niveles, proporcionando
          lineamientos para la implementación de los sistemas de la gestión de
          la producción desde el área administrativa (recurso humano,
          contabilidad, compras, inventarios, entre otras) hasta el proceso
          productivo (control, instrumentación, equipos, etc), mediante una red
          de comunicaciones, vertical y horizontal.
        </p>
        <div className="text-center w-50">
          <img src={ImgProcesoAC} className="rounded w-150 m-5" alt={ImgProcesoAC}/>
        </div>
      </div>
    </div>
  );
}
export { Inicio };
