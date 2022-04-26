import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import db from "./FireBase/firebaseConfig";
import {Timer} from "./Timer";

function Cronograma(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [CantMielB, setCantMielB] = useState(false);
  const [CantLev, setLev] = useState(false);
  const [value, setValue] = useState(false);
  const [tipo, setTipo] = useState(false);
  const [ID, setID] = useState(false);
  const [referencia, setReferencia] = useState(false);
  const [tipoLev, setTipoLev] = useState(false);
  const [IDLev, setIDLev] = useState(false);
  const [referenciaLev, setReferenciaLev] = useState(false);
  const [estadoEqNoDis, setEstadoEqNoDis] = useState(false);
  

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const saveData = () => {
    handleShow();
    const obtenerDatos = async () => {
      const datosInv = await getDocs(collection(db, "InvFermentacion"));
      const datosEq = await getDocs(collection(db, "Equipos"));

      datosEq.forEach((documento) => {
        console.log(documento.data().Estado);
        if (documento.data().Estado === "No Disponible") {
          setEstadoEqNoDis(documento.data().Estado);
        }
      });

      datosInv.forEach((documento) => {
        console.log(documento.data().Cantidad);
        if (documento.data().Tipo === "Miel B") {
          setCantMielB(documento.data().Cantidad);
          setTipo(documento.data().Tipo);
          setID(documento.data().ID);
          setReferencia(documento.data().Referencia);
        } else if (documento.data().Tipo === "Levadura") {
          setLev(documento.data().Cantidad);
          setTipoLev(documento.data().Tipo);
          setIDLev(documento.data().ID);
          setReferenciaLev(documento.data().Referencia);
        }
      });
    };
    obtenerDatos();
  };

  const CalculoMatPrima = () => {
    const CalcValueMielB = value * 0.5;
    const CalcValueLev = value * 0.25;

    if (
      CantMielB >= CalcValueMielB &&
      CantLev >= CalcValueLev &&
      estadoEqNoDis !== "No Disponible"
    ) {
      console.log("Incia Produccion");
      const CantidadRestanteMiel = CantMielB - CalcValueMielB;
      const CantidadRestanteLev = CantLev - CalcValueLev;
      ActuaDatosRestantes(CantidadRestanteMiel, CantidadRestanteLev);
      ActuaEquipos();
      handleClose();
      console.log(
        "Cantidad Restante:" + CantidadRestanteMiel + "," + CantidadRestanteLev
      );
    } else {
      console.log("Recursos Insuficientes");
      handleClose();
    }
  };
  const ActuaDatosRestantes = (CantidadRestanteMiel, CantidadRestanteLev) => {
    setDoc(doc(db, "InvFermentacion", "G1t7WMnJQlBQCm2Xv4wD"), {
      Tipo: tipo,
      Cantidad: CantidadRestanteMiel,
      Estado: "Disponible",
      ID: ID,
      Referencia: referencia,
    });
    setDoc(doc(db, "InvFermentacion", "Xi2s4yCOpwzv52X6nzZh"), {
      Tipo: tipoLev,
      Cantidad: CantidadRestanteLev,
      Estado: "Disponible",
      ID: IDLev,
      Referencia: referenciaLev,
    });
  };

  const ActuaEquipos = () => {
    setDoc(doc(db, "Equipos", "Tud9n6L881gwXsUJU3Qi"),{
      Capacidad: "5000 L",
      Estado: "No Disponible",
      ID: "F1",
      Proceso: "Fermentacion",
      Tiempo: "8 h"
    })

    setDoc(doc(db, "Equipos", "YT7yzreI6VKvxKfSRP4E"),{
      Capacidad: "5000 L",
      Estado: "No Disponible",
      ID: "Des1",
      Proceso: "Deshidratacion",
      Tiempo: "8 h"
    })

    setDoc(doc(db, "Equipos", "mKO03VmMYZ63oyCcKUwo"),{
      Capacidad: "5000 L",
      Estado: "No Disponible",
      ID: "D1",
      Proceso: "Destilacion",
      Tiempo: "8 h"
    })

    setDoc(doc(db, "Equipos", "o1RdjD1KQqLCtuaEDdZq"),{
      Capacidad: "4000 L",
      Estado: "No Disponible",
      ID: "M1",
      Proceso: "Mezcla",
      Tiempo: "3 h"
    })
  }

  return (
    <div>
      <h1 className="mt-3 ms-3 title">Orden De Producción</h1>
      <p className="ms-3 text-start">
        Cronograma de Alcohol Carburante a partir de la información de la orden
        de trabajo:
      </p>
      <Timer/>
      <div className="d-grid gap-2 col-6 mt-4">
        <button onClick={saveData} className="btn btn-primary ms-3">
          +Agregar Actividad
        </button>
      </div>

      {/* ----------Modal------ */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Esta sección se configura la orden de trabajo</p>
          <div className="col-auto">
            <input
              type="number"
              id="CantidadAC"
              className="form-control ms-3"
              name="cantidadAC"
              value={value}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={CalculoMatPrima}>
            +Agregar Actividad
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ----------ModalClose------ */}

      <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
        <div className="col">
          <div className="card">
            <div className="card-header title fw-bold">Por Hacer(1)</div>
            <div className="card-body">
              {/* <h5 className="card-title">Por hacer</h5> */}
              <p className="card-text">Capacidad: </p>
              <p className="card-text">Lote: </p>
              <a href="www.google.com" className="btn btn-primary">
                Ver más
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header title fw-bold">En Progreso(1)</div>
            <div className="card-body">
              {/* <h5 className="card-title">Por hacer</h5> */}
              <p className="card-text">Capacidad: </p>
              <p className="card-text">Tiempo: </p>
              <a href="www.google.com" className="btn btn-primary">
                Ver más
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header title fw-bold">Completado(1)</div>
            <div className="card-body">
              {/* <h5 className="card-title">Por hacer</h5> */}
              <p className="card-text">Capacidad: </p>
              <p className="card-text">Tiempo: </p>
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

export { Cronograma };
