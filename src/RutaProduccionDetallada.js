import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { ModalInv } from "./ModalInv";
import { ModalEq } from "./ModalEq";
import Accordion from "react-bootstrap/Accordion";
import { getFirestore } from "firebase/firestore";
import app from "./FireBase/firebaseConfig";
import { ModalOP } from "./ModalOP";
const db = getFirestore(app);

class RutaProduccionDetallada extends React.Component {
  constructor() {
    super();
    this.state = {
      listaInv1: [],
      listaEq1: [],
      listaOP1: []
    };
  }

  componentDidMount() {
    this.getInventario();
  }
  getInventario() {
    const obtenerDatos = async () => {
      const datosInv = await getDocs(collection(db, "InvFermentacion"));
      const datosEq = await getDocs(collection(db, "Equipos"));
      const datosOP = await getDocs(collection(db, "Actividad"));
      const listaInv = datosInv.docs.map((doc) => doc.data());
      const listaEq = datosEq.docs.map((doc) => doc.data());
      const listaOP = datosOP.docs.map((doc) => doc.data());
      this.setState({listaInv1: listaInv, listaEq1: listaEq, listaOP1: listaOP});
      console.log(listaInv);
      console.log(listaEq);
      console.log(listaOP);
    };
    obtenerDatos();
  }
  render() {
    return (
      <div>
        <h4 className="ms-3 mt-3 Titulos">Ruta de Producción Detallada</h4>
        <p className="ms-3 text-start">
          Enrutamiento detallado de producción de Alcohol Carburante a partir de
          la información colectada de los modulos de gestión del recurso
          disponible, orden de trabajo y equipos involucrados:
        </p>
        <div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Inventario</Accordion.Header>
              <Accordion.Body>
                {this.state.listaInv1.map((documento) => (
                  <ModalInv
                    Tipo={documento.Tipo}
                    ID={documento.ID}
                    key={documento.ID}
                    Referencia={documento.Referencia}
                    Cantidad={documento.Cantidad}
                    Estado={documento.Estado}
                  />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Equipos</Accordion.Header>
              <Accordion.Body>{this.state.listaEq1.map((documento) => (
                  <ModalEq
                    Tiempo={documento.Tiempo}
                    ID={documento.ID}
                    key={documento.ID}
                    NombreEquipo={documento.NombreEquipo}
                    Capacidad={documento.Capacidad}
                    Estado={documento.Estado}
                    Referencia={documento.Proceso}
                  />
                ))}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Orden de producción</Accordion.Header>
              <Accordion.Body>{this.state.listaOP1.map((documento) => (
                  <ModalOP
                    Referencia={documento.ID}
                    key={documento.ID}
                    Capacidad={documento.Cantidad}
                    Estado={documento.Estado}
                  />
                ))}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    );
  }
}

export { RutaProduccionDetallada };
