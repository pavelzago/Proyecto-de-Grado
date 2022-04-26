import React, { useState, useEffect } from "react";
import db from "../FireBase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ModalEq } from "../ModalEq";

function EqFermentacion(props) {
  const arrayFer = [];
  const [EqFermentacion1, setEqFermentacion] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const datos = await getDocs(collection(db, "EquiposFermentacion"));
      datos.forEach((documento) => {
        setEqFermentacion(documento.data());
      });
    };
    obtenerDatos();
  }, []);
  arrayFer.push(EqFermentacion1);
  return (
    <div>
      <h1 className="ms-3 mt-3 fs-3 subTitle">Equipos Fermentación</h1>
      <p className="ms-3 text-start">
        En esta sección se muestra la información de los equipos disponibles del
        Sub-proceso de fermentación.
      </p>

      {arrayFer.map((documento) => (
        <ModalEq
          Descripcion={documento.Descripcion}
          ID={documento.ID}
          key={documento.ID}
          Referencia={documento.Referencia}
          Tiempo={documento.Tiempo}
          Capacidad={documento.Capacidad}
          Estado={documento.Estado}
        />
      ))}
    </div>
  );
}
export { EqFermentacion };
