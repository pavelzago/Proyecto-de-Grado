import React, { useState } from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {RecetaFermentacion} from "./Recetas-RP/RecetaFermentacion";
import {RecetaDestilacion} from "./Recetas-RP/RecetaDestilacion";
import {RecetaDeshidratacion} from "./Recetas-RP/RecetaDeshidratacion";
import './ReglasProduccion.css';

function ReglasProduccion(props) {
  const [component, setComponent] = useState(false);

  const [dropdown, setDropdown] = useState(false);
  
  const abrircerrarDrop =()=>{
    setDropdown(!dropdown);
  }

  const selectDropdown =(variant)=>{
    if(variant==="fer"){
      setComponent(<RecetaFermentacion/>);
      console.log("Entre a Fermentación");
      
    }
    if(variant==="des"){
      setComponent(<RecetaDestilacion/>);
      console.log("Entre a Destilación");

    }
    if(variant==="desh"){
      setComponent(<RecetaDeshidratacion/>);
      console.log("Entre a Deshidratracion");
    }
  }

  return (
    <div>
      <h1 className="ms-3 mt-3 fs-4 subTitle">Reglas de Producción</h1>
      <p className="ms-3 text-start">
        La producción de Alcohol Carburante a partir de caña, puede englobarse
        en tres sub-procesos que están compuestos por las etapas de
        fermentación, destilación y deshidratación. A continuación información
        general sobre los sub-procesos:
      </p>

      <DropdownButton className="mt-3 ms-3"
        variant="btn dropDown fw-bold"
        title="Recetas"
        id="input-group-dropdown-1"
        onToggle={abrircerrarDrop}
      >
        <Dropdown.Item onClick={()=>selectDropdown("fer")}>Fermentación</Dropdown.Item>
        <Dropdown.Item onClick={()=>selectDropdown("des")}>Destilación</Dropdown.Item>
        <Dropdown.Item onClick={()=>selectDropdown("desh")}>Deshidratación</Dropdown.Item>
      </DropdownButton>
        <div>
          {component}
        </div>
    </div>
  );
}

export { ReglasProduccion };
