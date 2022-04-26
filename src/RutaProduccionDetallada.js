import React from "react";

function RutaProduccionDetallada(props) {
  return (
    <div>
        <h1 className="ms-3 mt-3 fs-4 subTitle">Ruta de Producción Detallada</h1>
        <p className="ms-3 text-start">
          Enrutamiento detallado de producción de Alcohol Carburante a partir de la información colectada de los modulos
          de gestión del recurso disponible, orden de trabajo y equipos involucrados: 
        </p>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card">
              <div className="card-header title fw-bold">
               Recurso Disponible
              </div>
              <div className="card-body">
                <h5 className="card-title fs-5">Cantidad Materia Prima</h5>
                <p className="card-text">Capacidad: </p>
                <p className="card-text">Lote: </p>
                <a href="www.google.com" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header title fw-bold">
                 Orden de Trabajo
              </div>
              <div className="card-body">
                <h5 className="card-title fs-5">Lote de producción #</h5>
                <p className="card-text">Capacidad: </p>
                <p className="card-text">Tiempo: </p>
                <a href="www.google.com" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header title fw-bold">
                Equipo Involucrados
              </div>
              <div className="card-body">
                <h5 className="card-title fs-5">Equipo #</h5>
                <p className="card-text">Capacidad: </p>
                <p className="card-text">Tiempo: </p>
                <a href="www.google.com" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export { RutaProduccionDetallada };