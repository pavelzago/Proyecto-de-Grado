import React, { useState} from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { EqFermentacion } from "./Equipos/EqFermentacion";
import { EqDestilacion } from "./Equipos/EqDestilacion";
import { EqDeshidratacion } from "./Equipos/EqDeshidratacion";

function Equipos(props) {
  const [component, setComponent] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const abrircerrarDrop = () => {
    setDropdown(!dropdown);
  };

  const selectDropdown = (variant) => {
    if (variant === "fer") {
      setComponent(<EqFermentacion />);
      console.log("Entre a Fermentación");
    }
    if (variant === "des") {
      setComponent(<EqDestilacion />);
      console.log("Entre a Destilación");
    }
    if (variant === "desh") {
      setComponent(<EqDeshidratacion />);
      console.log("Entre a Deshidratracion");
    }
  };

  return (
    <div>
      <h1 className="mt-3 ms-3 title">Equipos y Procesos</h1>
      <p className="ms-3 text-start">
        La producción de Alcohol Carburante a partir de caña, puede englobarse
        en tres sub-procesos que están compuestos por las etapas de
        fermentación, destilación y deshidratación. A continuación información
        de los equipos de cada sub-proceso:
      </p>
      <DropdownButton
        className="ms-3 mt-3"
        variant="btn dropDown fw-bold"
        title="Equipos"
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
    </div>
  );
}

export { Equipos };
