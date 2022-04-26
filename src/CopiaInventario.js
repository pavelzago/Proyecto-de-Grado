import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { InvFermentacion } from "./Inventario/InvFermentacion";
import { InvDestilacion } from "./Inventario/InvDestilacion";
import { InvDeshidratacion } from "./Inventario/InvDeshidratacion";
import { collection, addDoc } from "firebase/firestore";
import db from "./FireBase/firebaseConfig";
import { Modal, Button } from "react-bootstrap";

function Inventario(){
  const [component, setComponent] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const abrircerrarDrop = () => {
    setDropdown(!dropdown);
  };

  const selectDropdown = (variant) => {
    if (variant === "fer") {
      setComponent(<InvFermentacion />);
    }
    if (variant === "des") {
      setComponent(<InvDestilacion />);
    }
    if (variant === "desh") {
      setComponent(<InvDeshidratacion />);
      console.log("Entre a Deshidratracion");
    }
  };

  const saveData = () => {
    addDoc(collection(db, "InvFermentacion"), {
      Capacidad: "MielB1",
      Descripcion: "DescripcionInvFer1",
      Estado: "No disponible1",
      ID: 34121,
      Referencia: "Lote No.1",
    });
    console.log("Guarde!");
    handleClose();
  };

  return (
    <div>
      <h1 className="mt-3 ms-3 title">Inventario</h1>
      <p className=" ms-3 text-start">
        La producción de Alcohol Carburante a partir de caña, puede englobarse
        en tres sub-procesos que están compuestos por las etapas de
        fermentación, destilación y deshidratación. A continuación información
        de los recursos disponibles para producción de Alcohol Carburante:
      </p>
      <DropdownButton
        className="ms-3 "
        variant="btn dropDown fw-bold"
        title="Materia Prima"
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
      <button
        onClick={() => handleShow()}
        type="button"
        className="btn dropDown mt-3 ms-3 text-start"
      >
        Agregar Inventario
      </button>

      {/* ----------Modal------ */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <p>Esta sección se configura el Inventario a solicitar:</p>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="inputTipoMp" className="col-form-label">
                  Tipo de Materia Prima:
                </label>
                <DropdownButton
                  className="ms-3 "
                  variant="btn dropDown"
                  title="Seleccione el tipo Materia Prima"
                  id="input-group-dropdown-1"
                  onToggle={abrircerrarDrop}
                >
                  <Dropdown.Item>Miel B</Dropdown.Item>
                  <Dropdown.Item>Levadura</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>

            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="inputCantidadMP" className="col-form-label">
                  Ingrese la Cantidad de Materia Prima:
                </label>
                <input
                  type="string"
                  id="CantidadMP"
                  className="form-control ms-3"
                  aria-describedby="passwordHelpInline"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="IdMp" className="col-form-label">
                  Ingrese el ID de la Materia Prima:
                </label>
                <input
                  type="string"
                  id="IdMP"
                  className="form-control ms-3"
                  aria-describedby="passwordHelpInline"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="ReferenciaMP" className="col-form-label">
                  Ingrese la Referencia del lote:
                </label>
                <input
                  type="string"
                  id="ReferenciaMP"
                  className="form-control ms-3"
                  aria-describedby="passwordHelpInline"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveData}>
            +Agregar Inventario
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ----------ModalClose------ */}
    </div>
  );
}

export { Inventario };





// -----------------------

import React from "react";
import db from "../FireBase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ModalInv } from "../ModalInv";

class InvFermentacion extends React.Component {

  constructor(){
    super();
    this.state={
      arrayInvFer:[]
    }
  }

  componentDidMount(){
    this.getDataBD();
    console.log(this.state.arrayInvFer)
  }

  async getDataBD(){
    const arrayData=[];
      const datos = await getDocs(collection(db, "InvFermentacion"));
      datos.docs.map(doc=>{
        console.log(doc.data())
        arrayData.push(doc.data())
        this.setState({arrayInvFer:arrayData});
        return (this.state.arrayInvFer)
      })
    
  }
  
  render(){
  return (
    <div>
      <h1 className="ms-3 mt-3 fs-3 title">Inventario Fermentación</h1>
      <p className="ms-3 text-start">
        En esta sección se muestra la información del inventario disponible del
        Sub-proceso de fermentación.
      </p>
      {this.state.arrayInvFer.map((documento) => (
        <ModalInv
          Tipo={documento.Tipo}
          ID={documento.ID}
          key="1"
          Referencia={documento.Referencia}
          Cantidad={documento.Cantidad}
          Estado={documento.Estado}
        />
      ))}
    </div>
  );
      }
}
export { InvFermentacion };
