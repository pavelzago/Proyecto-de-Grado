import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {CalidadFermentacion} from "./Calidad/CalidadFermentacion";
import {CalidadDestilacion} from "./Calidad/CalidadDestilacion";
import {CalidadDeshidratacion} from "./Calidad/CalidadDeshidratacion";

function Calidad(props) {
  const [component, setComponent] = useState(false);

  const [dropdown, setDropdown] = useState(false);

  const abrircerrarDrop = () => {
    setDropdown(!dropdown);
  };

  const selectDropdown = (variant) => {
    if (variant === "fer") {
      setComponent(<CalidadFermentacion />);
      console.log("Entre a Fermentación");
    }
    if (variant === "des") {
      setComponent(<CalidadDestilacion/>);
      console.log("Entre a Destilación");
    }
    if (variant === "desh") {
      setComponent(<CalidadDeshidratacion/>);
      console.log("Entre a Deshidratracion");
    }
  };
  return (
    <div>
      <h1 className="mt-3 ms-3 title">Calidad</h1>
      <p className=" ms-3 text-start">
            La producción de Alcohol Carburante a partir de caña, puede englobarse
            en tres sub-procesos que están compuestos por las etapas de
            fermentación, destilación y deshidratación. A continuación información
            de las pruebas de calidad para producción de Alcohol Carburante: 
      </p>
      <DropdownButton
        className="ms-3 mt-3"
        variant="btn dropDown fw-bold"
        title="Pruebas Calidad"
        id="input-group-dropdown-1"
        onToggle={abrircerrarDrop}
      >
        <Dropdown.Item onClick={() => selectDropdown("fer")}>
          Fermentación
        </Dropdown.Item>
        <Dropdown.Item onClick={() => selectDropdown("des")}>
          Destilación
        </Dropdown.Item>
        <Dropdown.Item onClick={() => selectDropdown("desh")}>
          Deshidratación
        </Dropdown.Item>
      </DropdownButton>
      <div>{component}</div>

      <div className="card mt-3">
        <div className="card-header title fw-bold">Descripción de la prueba:</div>
        <div className="card-body">
          {/* <h5 className="card-title">Equipo # </h5> */}
          <p className="card-text">ID:</p>
          <p className="card-text">Tipo de Prueba:</p>
          <p className="card-text">Variable de medida:</p>
          <p className="card-text">Operario #:</p>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
        <div className="col">
          <div className="card">
            <div className="card-header title fw-bold">Activa (1)</div>
            <div className="card-body">
              <h5 className="card-title">Prueba # </h5>
              <p className="card-text">Variable Medida:</p>
              <p className="card-text">Tiempo:</p>
              <a href="www.google.com" className="btn btn-primary">
                Ver más
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header title fw-bold">Inactiva (1)</div>
            <div className="card-body">
              <h5 className="card-title">Prueba # </h5>
              <p className="card-text">Variable Medida:</p>
              <p className="card-text">Tiempo:</p>
              <a href="www.google.com" className="btn btn-primary">
                Ver más
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Calidad };
