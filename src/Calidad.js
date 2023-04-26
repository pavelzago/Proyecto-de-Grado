import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";
import { getFirestore } from "firebase/firestore";
import app from "./FireBase/firebaseConfig";
import { MdOutlineRefresh } from "react-icons/md";
const db = getFirestore(app);

class Calidad extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      tipo: "",
      IdTipo: "",
      Resultado: "",
      MensajeNotificacion: "",
      Id: "",
      IdOperario: "",
      dropdown: false,
      show: "",
      selectDropModal: "Seleccione el tipo de prueba",
      listaPrueba: [],
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData();
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  abrircerrarDrop() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  async selectTipoMP(variant) {
    if (variant === "Fer1") {
      this.setState({
        selectDropModal: " Registro % de alcohol del vino fermentado",
        tipo: " Registro % de alcohol del vino fermentado",
        IdTipo: "RAVF",
      });
    }
    if (variant === "Fer3") {
      this.setState({
        selectDropModal: "Registrar valor PH",
        tipo: "Registrar valor PH",
        IdTipo: "RVPH",
      });
    }
    if (variant === "Desh1") {
      this.setState({
        selectDropModal: "Pureza alcohol",
        tipo: "Pureza alcohol",
        IdTipo: "PA",
      });
    }
    if (variant === "Desh2") {
      this.setState({
        selectDropModal: "Registro % Etanol",
        tipo: "Registro % Etanol",
        IdTipo: "RE",
      });
    }
    if (variant === "Dest1") {
      this.setState({
        selectDropModal: "Registrar valor temperatura",
        tipo: "Registrar valor temperatura",
        IdTipo: "RVT",
      });
    }
    if (variant === "Dest2") {
      this.setState({
        selectDropModal: "Prueba alcohol anhidro acreditado",
        tipo: "Prueba alcohol anhidro acreditado",
        IdTipo: "PAAA",
      });
    }
  }

  saveData() {
    const save = async () => {
      addDoc(collection(db, "Calidad"), {
        Tipo: this.state.tipo,
        ID: this.state.Id,
        Resultado: this.state.Resultado,
        IdOperario: this.state.IdOperario,
      });
    };
    save();
    this.setMensajeNotificacion();
    this.handleClose();
  }

  setMensajeNotificacion() {
    console.log("Entre SetMensaje");
    console.log(this.state.IdTipo);
    console.log(this.state.Resultado);
 var mensaje= '';
    if (this.state.IdTipo === "RAVF" && this.state.Resultado === "2") {
      mensaje="Resultado esperado";
    } else if (this.state.IdTipo === "RVPH" && this.state.Resultado >= "2.5" && this.state.Resultado <= "2.7") {
      mensaje="Resultado de PH esperado";
    } else if (this.state.IdTipo === "RVPH" && this.state.Resultado < "2.5") {
      mensaje="Solicitar adición de levaduras";
    } else if (this.state.IdTipo === "RVPH" && this.state.Resultado > "2.7") {
      mensaje="Solicitar Correccion de PH";
    } else if (this.state.IdTipo === "PA" && this.state.Resultado >= "9.5" && this.state.Resultado <= "10.5") {
      mensaje="Resultado de pureza esperado";
    } else if (this.state.IdTipo === "PA" && this.state.Resultado < "9.5") {
      mensaje="Solicitar corrección de pureza ";
    } else if (this.state.IdTipo === "RE" && this.state.Resultado < "95") {
      mensaje="Redestilar";
    } else if (this.state.IdTipo === "RE" && this.state.Resultado >= "95" &&  this.state.Resultado <= "96") {
      mensaje="Resultado de Etanol esperado";
    } else if (this.state.IdTipo === "RVT" && this.state.Resultado === "91") {
      mensaje="Resultado esperado de temperatura";
    } else if (this.state.IdTipo === "RVT" && this.state.Resultado < "91") {
      mensaje="Inyectar mas vapor";
    } else if (this.state.IdTipo === "PAAA" && this.state.Resultado >= "99.5") {
      mensaje="Resultado esperado de alcohol anhidro";
    } else if (this.state.IdTipo === "PAAA" && this.state.Resultado < "97.5") {
      mensaje="El alcohol carburante no cumple con los requisitos de calidad.";
    }
    console.log(mensaje);
    this.savenotification(mensaje);
  }

  savenotification(value) {
    console.log("Entre Save Notifica");
    console.log(value);
  if(value !== ""){
    const save = async () => {
      addDoc(collection(db, "Notificaciones"), {
        ID: "01",
        Tipo: "Calidad",
        IDProceso: "ID: " + this.state.Id + " " + this.state.tipo,
        Description: value,
      });
    };
    save();
  }
}

  getData() {
    const obtenerDatos = async () => {
      const listaEspera = [];
      const HistorialCalidad = await getDocs(collection(db, "Calidad"));

      HistorialCalidad.docs.map((documento) => {
        listaEspera.push(documento.data());
        console.log(documento.data());
      });
      this.setState({ listaPrueba: listaEspera });
    };

    obtenerDatos();
  }

  render() {
    return (
      <div>
        <h1 className="mt-3 ms-3 title">Calidad</h1>
        <p className=" ms-3 text-start">
          La producción de Alcohol Carburante a partir de caña, puede englobarse
          en tres sub-procesos que están compuestos por las etapas de
          fermentación, destilación y deshidratación. A continuación información
          de las pruebas de calidad para producción de Alcohol Carburante:
        </p>

        {/* <div>
          <InvFermentacion />
        </div> */}
        <button
          onClick={() => this.handleShow()}
          type="button"
          className="btn dropDown mt-3 ms-3 text-start"
        >
          Agregar Resultado
        </button>

        <button
          onClick={() => this.getData()}
          type="button"
          className="btn dropDown mt-3 ms-3 text-start"
        >
          <MdOutlineRefresh />
        </button>

        {/* ----------Modal------ */}
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Resultado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <p>
                Esta sección se ingresa el resultado de la prueba de calidad:
              </p>
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="inputTipoMp" className="col-form-label">
                    Tipo de Prueba:
                  </label>
                  <DropdownButton
                    className="ms-3 "
                    variant="btn dropDown"
                    title={this.state.selectDropModal}
                    id="input-group-dropdown-1"
                    onClick={() => this.abrircerrarDrop()}
                  >
                    <Dropdown.Divider />
                    <Dropdown.Header>Pruebas de Fermentación:</Dropdown.Header>
                    <Dropdown.Item onClick={() => this.selectTipoMP("Fer1")}>
                      Registro % de alcohol del vino fermentado (2%)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.selectTipoMP("Fer3")}>
                      Registrar valor PH entre (2.5 PH 2.7)
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>
                      Pruebas de Deshidratación:
                    </Dropdown.Header>
                    <Dropdown.Item onClick={() => this.selectTipoMP("Desh1")}>
                      Pureza alcohol entre (9.5% Pureza 10.5%)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.selectTipoMP("Desh2")}>
                      Registro % etanol entre (95 Etanol 96 %)
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Pruebas de Destilación:</Dropdown.Header>
                    <Dropdown.Item onClick={() => this.selectTipoMP("Dest1")}>
                      Registrar valor temperatura (91 grados)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.selectTipoMP("Dest2")}>
                      Prueba alcohol anhidro acreditado (mayor a 99.5%)
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="IdP" className="col-form-label">
                    Ingrese el ID de la prueba:
                  </label>
                  <input
                    type="number"
                    id="IdP"
                    className="form-control ms-3"
                    name="Id"
                    value={this.state.Id}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="ResultadoPrueba" className="col-form-label">
                    Ingrese el resultado de la prueba:
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <input
                        type="string"
                        id="ResultadoPrueba"
                        className="form-control ms-3"
                        name="Resultado"
                        value={this.state.Resultado}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="IdOperario" className="col-form-label">
                    Ingrese el # de operario que realizó la prueba:
                  </label>
                  <input
                    type="string"
                    id="IdOperario"
                    className="form-control ms-3"
                    name="IdOperario"
                    value={this.state.IdOperario}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={() => this.saveData()}>
              Agregar resultado de la prueba
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ----------ModalClose------ */}

        <div className="row row-cols-1 g-4 mt-3">
          <div className="col">
            <div className="card mb-1">
              <div className="card-header title fw-bold">
                Historial de pruebas:
              </div>
            </div>
            {this.state.listaPrueba.map((doc) => (
              <div key={doc.ID} className="card">
                <div className="card-body mb-1">
                  <p className="card-text">
                    <b>Tipo de Prueba: </b>
                    {doc.Tipo}{" "}
                  </p>
                  <p className="card-text">
                    <b>ID: </b> {doc.ID}{" "}
                  </p>
                  <p className="card-text">
                    <b>Resultado prueba: </b> {doc.Resultado}{" "}
                  </p>
                  <p className="card-text">
                    <b>ID Operario: </b> {doc.IdOperario}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export { Calidad };
