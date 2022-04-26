import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AlcoholCarburante } from "./AlcoholCarburante";
import { ReglasProduccion } from "./ReglasProduccion";
import { RutaProduccionDetallada } from "./RutaProduccionDetallada";
import './ProcesoGeneral.css';

function ProcesoGeneral(props) {
  return (
    <Router>
      <div>
        <h1 className="mt-3 ms-3 title">Proceso General</h1>

        <div className="btn-group w-100 mt-3 ms-3" role="group" aria-label="Basic outlined example">
          <Link
            to="/AlcoholCarburante"
            type="button"
            className="btn tabs fw-bold"
          >
            Alcohol Carburante
          </Link>
          <Link
            to="/ReglasProduccion"
            type="button"
            className="btn tabs fw-bold"
          >
            Reglas de Producción
          </Link>
          <Link
            to="/RutaProduccionDetallada"
            type="button"
            className="btn tabs fw-bold"
          >
            Ruta de Producción Detallada
          </Link>
        </div>
        <Switch>
          <Route path="/AlcoholCarburante">
            <AlcoholCarburante />
          </Route>
          <Route path="/ReglasProduccion">
            <ReglasProduccion />
          </Route>
          <Route path="/RutaProduccionDetallada">
            <RutaProduccionDetallada />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export { ProcesoGeneral };
