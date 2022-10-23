import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "./FireBase/firebaseConfig";
const db = getFirestore(app);

class Notificaciones extends React.Component {
  constructor() {
    super();
    this.state = {
      listaNoti: [],
    };

    this.getData();
  }

  getData() {
    const obtenerDatos = async () => {
      const listaNotificiaciones = [];
      const HistorialCalidad = await getDocs(collection(db, "Notificaciones"));
      HistorialCalidad.docs.map((documento) => {
        listaNotificiaciones.push(documento.data());
        console.log(documento.data());
      });
      this.setState({ listaNoti: listaNotificiaciones });
    };

    obtenerDatos();
  }

  render() {
    return (
      <div>
        <h4 className="ms-3 mt-3 Titulos">Notificaciones: </h4>
        {this.state.listaNoti.map((doc) => (
          <div key={doc.ID} className="card">
            <div className="card-body mb-1">
            <p className="card-text">
                <b>Tipo: </b>
                {doc.Tipo}{" "}
              </p>
              <p className="card-text">
                <b>Descripción: </b>
                {doc.Description}{" "}
              </p>
              <p className="card-text">
                <b>Proceso: </b> {doc.IDProceso}{" "}
              </p>
              
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export { Notificaciones };
