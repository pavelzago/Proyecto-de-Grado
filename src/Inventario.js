import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { InvFermentacion } from "./Inventario/InvFermentacion";
import { collection, addDoc, getDocs, setDoc, doc} from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";
import {getFirestore} from "firebase/firestore";
import app from "./FireBase/firebaseConfig";
const db = getFirestore(app);

class Inventario extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      tipo: "",
      cantidad: "",
      Id: "",
      referencia: "",
      dropdown: false,
      show: "",
      selectDrop1: "Materia Prima",
      selectDropModal: "Seleccione el tipo de Materia Prima",
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    if (variant === "Miel") {
      this.setState({ selectDropModal: "Miel B", tipo: "Miel B" });
    }
    if (variant === "Lev") {
      this.setState({ selectDropModal: "Levadura", tipo: "Levadura" });
    }
    if (variant === "Agua") {
      this.setState({ selectDropModal: "Agua", tipo: "Agua" });
    }
  }

  saveData() {
    const obtenerDatos = async () => {
      var CantidadMielTot = 0;
      var TrazabilidadRef='';
      const datos = await getDocs(collection(db, "InvFermentacion"));
      console.log(datos.docs)
      if(datos.docs.length !== 0){
        console.log('Entre IF 1')
        datos.forEach((documento) => {
          if (documento.data().Tipo === "Miel B" && this.state.tipo === "Miel B" ) {
            CantidadMielTot = parseInt(this.state.cantidad) + parseInt(documento.data().Cantidad);
            TrazabilidadRef = this.state.referencia + '/' + documento.data().Referencia;
            console.log(TrazabilidadRef);
            this.updateDataMiel({
              Tipo: documento.data().Tipo,
              Cantidad: CantidadMielTot,
              Estado: "Disponible",
              ID: documento.data().ID,
              Referencia: TrazabilidadRef,
            })
            this.setState({
              tipo: "",
              cantidad: "",
              selectDropModal: "Seleccione el tipo de Materia Prima",
              Id: "",
              referencia: ""
            })
          } else if(this.state.tipo === "Levadura") {
            
            if(documento.data().Tipo === "Levadura"){
              CantidadMielTot = parseInt(this.state.cantidad) + parseInt(documento.data().Cantidad);
              TrazabilidadRef = this.state.referencia + '/' + documento.data().Referencia;
              console.log(TrazabilidadRef);
              this.updateDataLevadura({
                Tipo: documento.data().Tipo,
                Cantidad: CantidadMielTot,
                Estado: "Disponible",
                ID: documento.data().ID,
                Referencia: TrazabilidadRef,
              })
              this.setState({
                tipo: "",
                cantidad: "",
                selectDropModal: "Seleccione el tipo de Materia Prima",
                Id: "",
                referencia: ""
              })
            }
          }else if(this.state.tipo === "Agua") {
            
            if(documento.data().Tipo === "Agua"){
              CantidadMielTot = parseInt(this.state.cantidad) + parseInt(documento.data().Cantidad);
              this.updateDataAgua({
                Tipo: documento.data().Tipo,
                Cantidad: CantidadMielTot,
                Estado: "Disponible",
                ID: documento.data().ID,
                Referencia: documento.data().Referencia,
              })
              this.setState({
                tipo: "",
                cantidad: "",
                selectDropModal: "Seleccione el tipo de Materia Prima",
                Id: "",
                referencia: ""
              })
            }
          }
        });
      }else if(datos.docs.length === 0){
        console.log('Entre Else1')
        addDoc(collection(db, "InvFermentacion"), {
            Tipo: this.state.tipo,
            Cantidad: this.state.cantidad,
            Estado: "Disponible",
            ID: this.state.Id,
            Referencia: this.state.referencia,
          });
      }
      
    };
    obtenerDatos();
    this.handleClose();
  }

  updateDataMiel(obj){
    setDoc(doc(db, "InvFermentacion", "G1t7WMnJQlBQCm2Xv4wD"), obj)
    this.savenotification("Miel B");
  }
  updateDataLevadura(obj){
    setDoc(doc(db, "InvFermentacion", "Xi2s4yCOpwzv52X6nzZh"), obj)
    this.savenotification("Levadura");
  }

  updateDataAgua(obj){
    setDoc(doc(db, "InvFermentacion", "Stz20Ckxc14Xuf3zp8LD"), obj)
    this.savenotification("Agua");
  }

  savenotification(value){
    console.log(value);
      const save = async () => {
        addDoc(collection(db, "Notificaciones"), {
          ID: "03",
          Tipo: "Añadir Inventario",
          IDProceso: value,
          Description: "Se ha agregado materia prima de "+" "+ value + " "+ "al inventario",
        });
    }
    save();
  }

  render() {
    return (
      <div>
        <h1 className="mt-3 ms-3 title">Inventario</h1>
        <p className=" ms-3 text-start">
          La producción de Alcohol Carburante a partir de caña, puede englobarse
          en tres sub-procesos que están compuestos por las etapas de
          fermentación, destilación y deshidratación. A continuación información
          de los recursos disponibles para producción de Alcohol Carburante:
        </p>
         <button
          onClick={() => this.handleShow()}
          type="button"
          className="btn dropDown mt-3 ms-3 text-start"
        >
          Agregar Inventario
        </button>
        <div><InvFermentacion/></div>
       

        {/* ----------Modal------ */}
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
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
                    title={this.state.selectDropModal}
                    id="input-group-dropdown-1"
                    onClick={() => this.abrircerrarDrop()}
                  >
                    <Dropdown.Item onClick={() => this.selectTipoMP("Miel")}>
                      Miel B
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.selectTipoMP("Lev")}>
                      Levadura
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.selectTipoMP("Agua")}>
                      Agua
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="inputCantidadMP" className="col-form-label">
                    Ingrese la Cantidad de Materia Prima:
                  </label>
                  <div className="row">
                    <div className="col-auto">
                      <input
                        type="number"
                        id="CantidadMP"
                        className="form-control ms-3"
                        name="cantidad"
                        value={this.state.cantidad}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className="col-auto">
                      <span id="passwordHelpInline" className="form-text">
                        Lts.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="IdMp" className="col-form-label">
                    Ingrese el ID de la Materia Prima:
                  </label>
                  <input
                    type="number"
                    id="IdMP"
                    className="form-control ms-3"
                    name="Id"
                    value={this.state.Id}
                    onChange={(e) => this.handleChange(e)}
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
                    name="referencia"
                    value={this.state.referencia}
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
              Agregar Inventario
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ----------ModalClose------ */}
      </div>
    );
  }
}

export { Inventario };
