import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { ModalAgregarOP } from "./ModalAgregarOP";
import { PopUpAutohide } from "./toastide";
// Icons
import { MdOutlineRefresh } from "react-icons/md";
import "./Cronograma.css";

import app from "./FireBase/firebaseConfig";
const db = getFirestore(app);

function Cronograma() {
  const [Productfinishvalue, setProductfinishvalue] = useState(0);
  const [EstadoEquipos, setEstadoEquipos] = useState("");
  const [EstadoMielB, setEstadoMielB] = useState(false);
  const [MielBD, setMielBD] = useState();
  const [EstadoAgua, setEstadoAgua] = useState(false);
  const [AguaBD, setAguaBD] = useState();
  const [EstadoLevadura, setEstadoLevadura] = useState(false);
  const [LevaduraBD, setLevaduraBD] = useState();
  const [listaActividadCompletado, setlistaActividadCompletado] = useState([]);
  const [listaActividadEspera, setlistaActividadEspera] = useState([]);
  const [listaActividadID, setlistaActividadID] = useState([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [titleAlert, setTitleAlert] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const [AlcoholCarEspera, setAlcoholCarEspera] = useState(0);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCloseAlert = () => setShowAlert(false);

  useEffect(() => {
    GetproductoTerminadoBD();
    EquiposAvailable();
    InventarioAvailable();
    GetactividadesBD();
  }, []);

  // Metodo para traer actividades de la base de datos
  const GetactividadesBD = () => {
    const listaActividadespendientes = [];
    const listaCompletado = [];
    const ArrayActividadesID = [];
    var TotalAlcoholCarAProducir = 0;

    const obtenerDatos = async () => {
      const datosActividad = await getDocs(collection(db, "Actividad"));
      datosActividad.forEach((value) => {
        if (value.data().Estado === "En Espera") {
          listaActividadespendientes.push(value.data());
          ArrayActividadesID.push({
            ID: value.id,
            Cantidad: value.data().Cantidad,
          });
          TotalAlcoholCarAProducir += parseInt(value.data().Cantidad);
          CalculoBatchEspera(TotalAlcoholCarAProducir);
        } else if (value.data().Estado === "Completado") {
          listaCompletado.push(value.data());
        }
      });
      setlistaActividadEspera(listaActividadespendientes);
      setlistaActividadCompletado(listaCompletado);
      setlistaActividadID(ArrayActividadesID);
    };
    obtenerDatos();
  };

  //Metodo para calcular cuantas batch se necesitan
  const CalculoBatchEspera = (value) => {
    var TotalBatch = Math.ceil(value / 5);
    setAlcoholCarEspera(TotalBatch);
  };
  //Obtener valor de la cantidad de producto terminado de la base de datos
  const GetproductoTerminadoBD = () => {
    const obtenerDatos = async () => {
      const productFinish = await getDocs(collection(db, "InvFermentacion"));
      productFinish.forEach((value) => {
        if (value.data().Tipo === "ProductoTerminado") {
          setProductfinishvalue(value.data().Cantidad);
        }
      });
    };
    obtenerDatos();
  };

  //Guardar valor del producto terminado en la base de datos
  const saveFinishProductBD = (value) => {
    updateDoc(doc(db, "InvFermentacion", "7mG92taRIe9P8xGV4Vhn"), {
      Cantidad: value,
    });
  };

  //Metodo para conocer disponibilidad de equipos
  const EquiposAvailable = () => {
    const obtenerDatos = async () => {
      const ListaEquipos = await getDocs(collection(db, "Equipos"));
      ListaEquipos.forEach((documento) => {
        if (documento.data().Estado === "No Disponible") {
          setEstadoEquipos(documento.data().Estado);
        } else if (documento.data().Estado === "Disponible") {
          setEstadoEquipos(documento.data().Estado);
        }
      });
    };
    obtenerDatos();
  };

  //Metodo para conocer disponibilidad de inventario
  const InventarioAvailable = () => {
    const obtenerDatos = async () => {
      const ListaInventario = await getDocs(collection(db, "InvFermentacion"));
      ListaInventario.forEach((documento) => {
        if (documento.data().Tipo === "Miel B") {
          if (documento.data().Cantidad > 5.5) {
            setEstadoMielB(true);
            setMielBD(documento.data().Cantidad);
          }
        } else if (documento.data().Tipo === "Levadura") {
          if (documento.data().Cantidad > 0.16) {
            setEstadoLevadura(true);
            setLevaduraBD(documento.data().Cantidad);
          }
        } else if (documento.data().Tipo === "Agua") {
          if (documento.data().Cantidad > 20) {
            setEstadoAgua(true);
            setAguaBD(documento.data().Cantidad);
          }
        }
      });
    };
    obtenerDatos();
  };

  //Guardar valor del producto terminado en la base de datos
  const startProduction = () => {
    GetproductoTerminadoBD();
    EquiposAvailable();
    InventarioAvailable();
    console.log(EstadoEquipos);
    console.log(EstadoMielB);
    console.log(EstadoLevadura);
    console.log(EstadoAgua);
    mostrarpopups(EstadoEquipos, EstadoMielB, EstadoLevadura, EstadoAgua);
    var totalProductoterminado = 0;
    if (Productfinishvalue === 20) {
      console.log("Almacenamiento lleno");
      setShowAlert(true);
      setTypeAlert("danger");
      setTitleAlert("Lo sentimos!");
      setTextAlert(
        "No se puede poner en producción debido a que el almacenamiento de los tanques esta completo"
      );
    } else if (
      EstadoEquipos !== "No Disponible" &&
      EstadoMielB === true &&
      EstadoLevadura === true &&
      EstadoAgua === true
    ) {
      //En este if se agrega producto terminado a el almacenamiento
      console.log("Entreeeee");
      totalProductoterminado = Productfinishvalue + 5;
      var MielRestante = MielBD - 5.5;
      var LevaduraRestante = LevaduraBD - 0.16;
      var AguaRestante = AguaBD - 20;
      setEstadoLevadura(false);
      setEstadoMielB(false);
      setEstadoAgua(false);
      saveFinishProductBD(totalProductoterminado);
      ActualizarDatosRestantesInventario(
        MielRestante,
        LevaduraRestante,
        AguaRestante
      );
      ActuaEquipos("No Disponible");
    }
  };

  // Metodo para mostrar popups

  const mostrarpopups = (
    EstadoEquipos,
    EstadoMielB,
    EstadoLevadura,
    EstadoAgua
  ) => {
    if (EstadoEquipos === "No Disponible") {
      setShowAlert(true);
      setTypeAlert("danger");
      setTitleAlert("Lo sentimos!");
      setTextAlert("Los equipos no estan Disponibles");
    } else if (EstadoMielB === false) {
      setShowAlert(true);
      setTypeAlert("danger");
      setTitleAlert("Lo sentimos!");
      setTextAlert("No hay Miel B en el inventario");
    } else if (EstadoLevadura === false) {
      setShowAlert(true);
      setTypeAlert("danger");
      setTitleAlert("Lo sentimos!");
      setTextAlert("No hay Levadura en el inventario");
    } else if (EstadoAgua === false) {
      setShowAlert(true);
      setTypeAlert("danger");
      setTitleAlert("Lo sentimos!");
      setTextAlert("No hay Agua en el inventario");
    }
  };

  //Metodo para actualizar datos del inventario en la base de datos
  const ActualizarDatosRestantesInventario = (
    CantidadRestanteMiel,
    CantidadRestanteLev,
    CantidadRestanteAgua
  ) => {
    updateDoc(doc(db, "InvFermentacion", "G1t7WMnJQlBQCm2Xv4wD"), {
      Cantidad: CantidadRestanteMiel,
    });
    updateDoc(doc(db, "InvFermentacion", "Xi2s4yCOpwzv52X6nzZh"), {
      Cantidad: CantidadRestanteLev,
    });
    updateDoc(doc(db, "InvFermentacion", "Stz20Ckxc14Xuf3zp8LD"), {
      Cantidad: CantidadRestanteAgua,
    });
  };

  //Metodo para actualizar actividades
  const saveActividad = (value, estado) => {
    var id = Math.trunc(Math.random() * (1000 - 100) + 100);
    const save = async () => {
      addDoc(collection(db, "Actividad"), {
        Cantidad: value,
        Estado: estado,
        ID: id,
      });
    };
    save();
  };

  //Metodo para traer input de modal y calcular producto terminado restante y actualizacion BD
  const dataInput = (value) => {
    var ValuePTrestante = 0;
    if (value <= Productfinishvalue) {
      console.log("Si puedo hacerlo");
      setShowAlert(true);
      setTypeAlert("success");
      setTitleAlert("Orden completada!");
      setTextAlert("Su orden ha sido completada con exito");
      ValuePTrestante = Productfinishvalue - value;
      setProductfinishvalue(ValuePTrestante);
      saveFinishProductBD(ValuePTrestante);
      saveActividad(value, "Completado");
    } else {
      console.log("Orden Pendiente");
      saveActividad(value, "En Espera");
    }
    handleClose();
  };

  //Metodo para cambiar estado de equipos
  const ActuaEquipos = (disponibilidad) => {
    updateDoc(doc(db, "Equipos", "Tud9n6L881gwXsUJU3Qi"), {
      Estado: disponibilidad,
    });

    updateDoc(doc(db, "Equipos", "YT7yzreI6VKvxKfSRP4E"), {
      Estado: disponibilidad,
    });

    updateDoc(doc(db, "Equipos", "mKO03VmMYZ63oyCcKUwo"), {
      Estado: disponibilidad,
    });

    updateDoc(doc(db, "Equipos", "o1RdjD1KQqLCtuaEDdZq"), {
      Estado: disponibilidad,
    });
    setEstadoEquipos(disponibilidad);
  };

  //Metodo para actualizar activades a completado
  const UpdateActCompletado = (ID, disponibilidad) => {
    updateDoc(doc(db, "Actividad", ID), {
      Estado: disponibilidad,
    });
  };

  //Metodo para pasar actividades a completado
  const OrdenesACompletado = () => {
    var ProductfinRest2 = Productfinishvalue;
    listaActividadID.forEach((value) => {
      if (value.Cantidad <= ProductfinRest2) {
        ProductfinRest2 = ProductfinRest2 - value.Cantidad;
        saveFinishProductBD(ProductfinRest2);
        UpdateActCompletado(value.ID, "Completado");
        MostrarAlerts ("success", "Orden completada!", "Tu orden ha sido completada con exito")
      }else if(value.Cantidad > ProductfinRest2){
        console.log("no ay alcool ")
        MostrarAlerts ("danger", "Lo sentimos!", "No tienes alcohol para completar la orden")

      }
      setProductfinishvalue(ProductfinRest2);
    });
    if(listaActividadID.length === 0){
      MostrarAlerts ("danger", "Lo sentimos!", "No tienes ordenes pendientes para completar")
      console.log("no tienes ordenes pendientes")
    }
    GetactividadesBD();
  };

  const MostrarAlerts = (tipo, titulo, cuerpo)=> {
    setShowAlert(true);
    setTypeAlert(tipo);
    setTitleAlert(titulo);
    setTextAlert(cuerpo);
  }

  return (
    <div>
      <h1 className="mt-3 ms-3 title">Orden De Producción</h1>
      <div className="row mt-5 mb-5">
        <div className="col-6">
          <div className="card card-up">
            <div className="card-body">
              <p className="textmodal1 mb-0">{Productfinishvalue} Lts.</p>
              <p className="textmodal2 mb-0"> Producto terminado almacenado</p>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card card-up">
            <div className="card-body">
              <p className="textmodal1 mb-0">{AlcoholCarEspera}</p>
              <p className="textmodal2 mb-0">
                Cantidad de batch para completar actividades
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* lista botones */}

      <button
        onClick={startProduction}
        type="button"
        className="btn botoncronograma"
      >
        Iniciar producción
      </button>
      <button
        onClick={handleShow}
        type="button"
        className="btn botoncronograma"
      >
        Agregar orden
      </button>
      <button
        onClick={(e) => ActuaEquipos("Disponible")}
        type="button"
        className="btn botoncronograma"
      >
        Reset Equipos
      </button>
      
      <button
        onClick={OrdenesACompletado}
        type="button"
        className="btn botoncronograma"
      >
        Actividades a completado
      </button>
      {/* lista botones */}

      {/* Modal */}
      <div>
        <ModalAgregarOP
          show={show}
          handleClose={handleClose}
          dataInput={dataInput}
        />
      </div>
      {/* Cierre Modal */}

      {/* Aqui empieza la lista de las actividades */}
      <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
        <div className="col">
          <div className="card mb-1">
            <div className="card-header title fw-bold">
              <div className="row">
                <div className="col-9">Actividades por Hacer</div>
                <div className="col-3 text-end">
                  <button
                    onClick={GetactividadesBD}
                    type="button"
                    className="botonrefresh"
                  >
                    <MdOutlineRefresh />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {listaActividadEspera.map((doc) => (
            <div key={doc.ID} className="card cardEspera">
              <div className="card-body mb-1 ">
                <p className="card-text">
                  <b>Cantidad de alcohol a producir: {doc.Cantidad} Lts.</b>
                </p>
                <p className="card-text">Orden #: {doc.ID} </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <div className="card mb-1">
            <div className="card-header title fw-bold">
              Actividades completadas
            </div>
          </div>
          {listaActividadCompletado.map((doc) => (
            <div key={doc.ID} className="card cardCompletada">
              <div className="card-body mb-1">
                <p className="card-text">
                  <b>Cantidad de alcohol producida: {doc.Cantidad} Lts.</b>
                </p>
                <p className="card-text">Orden #: {doc.ID} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Aqui se acaba la lista de actividades */}

      {/* div para alert */}
      <div className="text-center">
        <div className="position-absolute top-50 start-50 translate-middle">
          <PopUpAutohide
            type={typeAlert}
            state={showAlert}
            title={titleAlert}
            text={textAlert}
            handleCloseAlert={handleCloseAlert}
          />
        </div>
      </div>
      {/* cirre div para alert */}
    </div>
  );
}

export { Cronograma };
