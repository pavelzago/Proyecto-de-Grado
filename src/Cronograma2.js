import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
import { Timer } from "./Timer";
import { getFirestore } from "firebase/firestore";
import { MdOutlineRefresh } from "react-icons/md";

import app from "./FireBase/firebaseConfig";
import "./Cronograma.css";
const db = getFirestore(app);

function Cronograma2() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [CantMielB, setCantMielB] = useState(false);
  const [Counter, setCounter]=useState(1);
  const [CantLev, setLev] = useState(false);
  const [value, setValue] = useState(false); //Valor del input que ingresa el usuario
  const [tipo, setTipo] = useState(false);
  const [ID, setID] = useState(false);
  const [referencia, setReferencia] = useState(false);
  const [tipoLev, setTipoLev] = useState(false);
  const [IDLev, setIDLev] = useState(false);
  const [referenciaLev, setReferenciaLev] = useState(false);
  const [estadoEqNoDis, setEstadoEqNoDis] = useState(false);
  const [estadoAct, setEstadoAct] = useState(false);
  const [capacidadAC, setcapacidadAC] = useState();
  const [listaActividadEspera, setlistaActividadEspera] = useState([]);
  const [listaActividadProgreso, setlistaActividadProgreso] = useState([]);
  const [listaActividadCompletado, setlistaActividadCompletado] = useState([]);
  const [objectprogress, setobjectprogress] =useState({});
  const [IdDocumentFire, setIdDocumentFire]=useState();
  const [tiempo, settiempo]=useState(false); 

  useEffect(() => {
    //  console.log(props.Timer);
    getData();
    ordenesProduccion();
  }, []);

  useEffect(() => {
    console.log(IdDocumentFire);
    console.log(objectprogress);
    console.log(tiempo);
    if(tiempo === true){
      console.log("eee");
      setprogresstocomplete(IdDocumentFire, objectprogress);
    }
  }, [IdDocumentFire, objectprogress]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //Metodo para cambiar estado de equipos cuando se acabe el timer
  const handleSearch = (e) => {
    ActuaEquipos("Disponible");
    settiempo(true);
    console.log("Entre");
    console.log(IdDocumentFire);
  };

  const getData = () => {
    var mielB = 0;
    var lev = 0;
    const obtenerDatos = async () => {
      try {
        const datosInv = await getDocs(collection(db, "InvFermentacion"));
        //En este metodo se inicializan las variables con las cantidades de la base de datos
        datosInv.forEach((documento) => {
          if (documento.data().Tipo === "Miel B") {
            mielB = documento.data().Cantidad;
            console.log(mielB);
          } else if (documento.data().Tipo === "Levadura") {
            lev = documento.data().Cantidad;
          }
        });
        CapacidadAlcoholcarburante(mielB, lev);
      } catch (error) {}
    };
    obtenerDatos();
  };

  const ordenesProduccion = () => {
    const obtenerDatos = async () => {
      const listaEspera = [];
      const listaProgreso = [];
      const listaCompletado = [];

      try {
        const datosActividad = await getDocs(collection(db, "Actividad"));
        console.log(datosActividad.size)
        datosActividad.docs.map((doc) => {
          
          if (doc.data().Estado === "En Espera") {
            listaEspera.push(doc.data());
            console.log(listaEspera.length)

          } else if (doc.data().Estado === "En Progreso") {
              listaProgreso.push(doc.data());
                let idgeneral=doc.id;
                setobjectprogress({
                  Cantidad: doc.data().Cantidad,
                  Estado: "Completado",
                  ID:doc.data().ID,
                })
               setIdDocumentFire(idgeneral);
            
          } else if (doc.data().Estado === "Completado") {
            listaCompletado.push(doc.data());
          }
        });
      } catch (error) {
        console.log(error);
      }
      setlistaActividadEspera(listaEspera);
      setlistaActividadProgreso(listaProgreso);
      setlistaActividadCompletado(listaCompletado);

    };
    obtenerDatos();
  };
    //Metodo para cambiar estado de progress a complete
  const setprogresstocomplete = (id, obje) =>{
    setDoc(doc(db, "Actividad", id), obje);
  }

  const saveData = () => {

    const obtenerDatos = async () => {
      const datosInv = await getDocs(collection(db, "InvFermentacion"));
      const datosEq = await getDocs(collection(db, "Equipos"));

      datosEq.forEach((documento) => {
        if (documento.data().Estado === "No Disponible") {
          setEstadoEqNoDis(documento.data().Estado);
        }
      });
      datosInv.forEach((documento) => {
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
    handleShow();
  };

  const saveActividad = (estado) => {
    var id=Counter+1;
    setCounter(id);
    const save = async () => {
      addDoc(collection(db, "Actividad"), {
        Cantidad: value,
        Estado: estado,
        ID:Counter,
      });
    };
    save();
  };

  const CalculoMatPrima = () => {
    //Formulas para saber cantidad de miel y cantidad de levadura que se necesita
    console.log(value);
    const CalcValueMielB = (value / 0.9).toFixed(1);
    const CalcValueLev = ((value * 0.03) / 0.9).toFixed(1);
    console.log(estadoEqNoDis)
    console.log(CalcValueMielB, CalcValueLev);
    console.log(CantMielB, CantLev);
    //----------------
    //IF para notificaciones de inv faltante
    if (CalcValueMielB > CantMielB) {
      savenotification("MielB");
    }
    if (CalcValueLev > CantLev) {
      savenotification("Levadura");
    }
    //-----------------
    const espera = async () => {
      //IF con condiciones para iniciar proceso Alcohol carburante
      if (
        CantMielB >= CalcValueMielB &&
        CantLev >= CalcValueLev &&
        estadoEqNoDis !== "No Disponible"
      ) {
        console.log("entrejjj");
        // const prueba= await setEstadoAct("En progreso");
        const CantidadRestanteMiel = CantMielB - CalcValueMielB;
        const CantidadRestanteLev = CantLev - CalcValueLev;
        ActuaDatosRestantes(CantidadRestanteMiel, CantidadRestanteLev);
        ActuaEquipos("No Disponible");
        // console.log(prueba, estadoAct);
        saveActividad("En Progreso");
        handleClose();
      } else {
        //revisar por que cuando se le quita el await no funciona
        // const prueba = await setEstadoAct("En espera");
        console.log("Recursos Insuficientes");
        // console.log(prueba, estadoAct);
        // console.log(prueba, estadoAct)
        saveActividad("En Espera");
        handleClose();
      }
    };
    espera();
  };

  const CapacidadAlcoholcarburante = (MielB, Lev) => {
    //Metodo para calcular si la miel es suficiente para producir el alcohol carburante
    console.log(MielB, Lev);
    const resulACLev = ((Lev * 0.9) / 0.03).toFixed(1); // Se calcula el resultado de alcohol carburante dependiendo de la cantidad de levadura
    const Xmiel = (resulACLev / 0.9).toFixed(1); //Se calcula la cantidad de miel que se necesita para producir el alcohol carburante de acuerdo con la formula anterior
    console.log(resulACLev);

    if (Xmiel <= MielB) {
      setcapacidadAC(resulACLev + " L Alcohol Carburante");
    } else {
      setcapacidadAC("Miel Insuficiente");
      savenotification("Miel B");
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

  const ActuaEquipos = (disponibilidad) => {
    setDoc(doc(db, "Equipos", "Tud9n6L881gwXsUJU3Qi"), {
      Capacidad: "5000 L",
      Estado: disponibilidad,
      ID: "F1",
      Proceso: "Fermentación",
      Tiempo: "8 h",
    });

    setDoc(doc(db, "Equipos", "YT7yzreI6VKvxKfSRP4E"), {
      Capacidad: "5000 L",
      Estado: disponibilidad,
      ID: "Des1",
      Proceso: "Deshidratación",
      Tiempo: "8 h",
    });

    setDoc(doc(db, "Equipos", "mKO03VmMYZ63oyCcKUwo"), {
      Capacidad: "5000 L",
      Estado: disponibilidad,
      ID: "D1",
      Proceso: "Destilación",
      Tiempo: "8 h",
    });

    setDoc(doc(db, "Equipos", "o1RdjD1KQqLCtuaEDdZq"), {
      Capacidad: "4000 L",
      Estado: disponibilidad,
      ID: "M1",
      Proceso: "Mezcla",
      Tiempo: "3 h",
    });
  };

  const savenotification = (value) => {
    console.log(value);

    const save = async () => {
      addDoc(collection(db, "Notificaciones"), {
        ID: "02",
        Tipo: "Inventario Insuficiente",
        IDProceso: value,
        Description:
          "El inventario de " + " " + value + " " + "es insuficiente",
      });
    };
    save();
  };



  return (
    <div>
      <h1 className="mt-3 ms-3 title">Orden De Producción</h1>
      <p className="ms-3 text-start">
        Cronograma de producción de Alcohol Carburante:
      </p>

      <div className="divEquipos px-4 py-2">
        <div className="row">
          <div className="col-4">
            <p>Equipos disponibles:</p>
            <p>Capacidad para produccion:</p>
            <p className="timer">{capacidadAC}</p>
          </div>
          <div className="col-4">
            <p>Equipos disponibles en:</p>
            <Timer handleSearch={(e) => handleSearch(e)} />
          </div>
          <div className="col-4 divbutton">
            <button onClick={saveData} className="btn btn-primary">
              Agregar Actividad
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-5 ml-3 p-0">
          <h3 className="mt-3 me-0 ms-3 p-0">Ordenes de producción</h3>
        </div>
        <div className="col p-0">
          <button
            onClick={ordenesProduccion}
            type="button"
            className="btn dropDown mt-3 text-start">
            <MdOutlineRefresh />
          </button>
        </div>
      </div>

      {/* ----------Modal------ */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-auto">
            <p>
              Por favor ingrese la cantidad de alcohol carburante en litros que
              desea producir:
            </p>
            <div className="row">
              <div className="col-6">
                <input
                  type="number"
                  id="CantidadAC"
                  className="form-control"
                  name="cantidadAC"
                  value={value}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-6">
                <p className="m-0">L</p>
              </div>
            </div>
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
          <div className="card mb-1">
            <div className="card-header title fw-bold">Por Hacer</div>
          </div>
          {listaActividadEspera.map((doc) => (
            <div key={doc.ID} className="card">
              <div className="card-body mb-1">
                <p className="card-text">ID:{doc.ID} </p>
                <p className="card-text">Capacidad: {doc.Cantidad} L</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <div className="card mb-1">
            <div className="card-header title fw-bold">En progreso</div>
          </div>
          {listaActividadProgreso.map((doc) => (
            <div key={doc.ID} className="card">
              <div className="card-body mb-1">
                <p className="card-text">ID:{doc.ID} </p>
                <p className="card-text">Capacidad:{doc.Cantidad} L</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <div className="card mb-1">
            <div className="card-header title fw-bold">Completadas</div>
          </div>
          {listaActividadCompletado.map((doc) => (
            <div key={doc.ID} className="card">
              <div className="card-body mb-1">
                <p className="card-text">ID :  {doc.ID} </p>
                <p className="card-text">Capacidad: {doc.Cantidad} L </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Cronograma2 };
