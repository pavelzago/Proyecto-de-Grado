import React, { useState, useEffect } from "react";
import db from "../FireBase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ModalEq } from "../ModalEq";

function EqDeshidratacion(props) {
  const arrayDesh = [];
  const [EqDeshidratacion1, setEqDeshidratacion] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const datos = await getDocs(collection(db, "EquiposDeshidratacion"));
      datos.forEach((documento) => {
        setEqDeshidratacion(documento.data());
      });
    };
    obtenerDatos();
  }, []);
  arrayDesh.push(EqDeshidratacion1);
  return (
    <div>
      <h1 className="ms-3 mt-3 fs-3 subTitle">Equipos Deshidratación</h1>
      <p className="ms-3 text-start">
        En esta sección se muestra la información de los equipos disponibles del
        Sub-proceso de Deshidratación.
      </p>
      {arrayDesh.map((documento) => (
        <ModalEq
          Descripcion={documento.Descripcion}
          ID={documento.ID}
          key={documento.Descripcion}
          Referencia={documento.Referencia}
          Tiempo={documento.Tiempo}
          Capacidad={documento.Capacidad}
          Estado={documento.Estado}
        />
      ))}
    </div>
  );
}
export { EqDeshidratacion };
