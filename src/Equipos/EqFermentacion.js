import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ModalEq } from "../ModalEq";
import { getFirestore } from "firebase/firestore";
import Accordion from "react-bootstrap/Accordion";

import app from "../FireBase/firebaseConfig";
const db = getFirestore(app);

function EqFermentacion() {
  const [EqFermentacion1, setEqFermentacion] = useState([]);
  const [listaActFerm, setlistaActFerm] = useState([]);
  const [listaActDest, setlistaActDest] = useState([]);
  const [listaActDesh, setlistaActDesh] = useState([]);

  useEffect(() => {
    getInventario();
  }, []);
  const getInventario = () => {
    const obtenerDatos = async () => {
      const listaFerm = [];
      const listaDest = [];
      const listaDesh = [];
      const datosEq = await getDocs(collection(db, "Equipos"));
      // const listaEq = datosEq.docs.map((doc) => doc.data());
      const listaEq = datosEq.docs.map((doc) => {
        if (doc.data().Proceso === "Fermentación") {
          listaFerm.push(doc.data());
        } else if (doc.data().Proceso === "Destilación") {
          listaDest.push(doc.data());
        } else if (doc.data().Proceso === "Deshidratación") {
          listaDesh.push(doc.data());
        }
      });
      setEqFermentacion(listaEq);
      setlistaActFerm(listaFerm);
      setlistaActDest(listaDest);
      setlistaActDesh(listaDesh);
    };
    obtenerDatos();
  };
  return (
    <div>
      <h1 className="ms-3 mt-3 fs-3 subTitle">Equipos Proceso Alcohol Carburante</h1>
      <p className="ms-3 text-start">
        En esta sección se muestra la información de los equipos disponibles del
        proceso de Alcohol Carburante.
      </p>
      <div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Equipos Fermentación</Accordion.Header>
            <Accordion.Body className="row row-cols-2 row-cols-lg-2 g-2" >
              {listaActFerm.map((documento) => (
                <div className="col" key={documento.ID}>
                  <ModalEq
                    Tiempo={documento.Tiempo}
                    ID={documento.ID}
                    key={documento.ID}
                    NombreEquipo={documento.NombreEquipo}
                    Capacidad={documento.Capacidad}
                    Estado={documento.Estado}
                    Referencia={documento.Proceso}
                  />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Equipos Destilación</Accordion.Header>
            <Accordion.Body className="row row-cols-2 row-cols-lg-2 g-2" >
              {listaActDest.map((documento) => (
                <div className="col-6" key={documento.ID}>
                  <ModalEq
                    Tiempo={documento.Tiempo}
                    ID={documento.ID}
                    key={documento.ID}
                    NombreEquipo={documento.NombreEquipo}
                    Capacidad={documento.Capacidad}
                    Estado={documento.Estado}
                    Referencia={documento.Proceso}
                  />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Equipos Deshidratación</Accordion.Header>
            <Accordion.Body className="row row-cols-2 row-cols-lg-2 g-2" >
            {listaActDesh.map((documento) => (
          <div className="col-6" key={documento.ID}>
            <ModalEq
              Tiempo={documento.Tiempo}
              ID={documento.ID}
              key={documento.ID}
              NombreEquipo={documento.NombreEquipo}
              Capacidad={documento.Capacidad}
              Estado={documento.Estado}
              Referencia={documento.Proceso}
            />
          </div>
        ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
export { EqFermentacion };
