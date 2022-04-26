import React, { useState, useEffect } from "react";
import db from "../FireBase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ModalInv } from "../ModalInv";

function InvFermentacion(props) {
  const [InvFermentacion1, setInvFermentacion] = useState([]);


  useEffect(() => {
    const arrayInvFer = [];
    const obtenerDatos = async () => {
      const datos = await getDocs(collection(db, "InvFermentacion"));
      datos.forEach((documento) => {
        arrayInvFer.push(documento.data());
      });
      setInvFermentacion(arrayInvFer);
    };
    obtenerDatos();
  }, []);

  return (
    <div>
      <h1 className="ms-3 mt-3 fs-3 title">Inventario Fermentación</h1>
      <p className="ms-3 text-start">
        En esta sección se muestra la información del inventario disponible del
        Sub-proceso de fermentación.
      </p>
      {InvFermentacion1.map((documento) => (
        <ModalInv
          Tipo={documento.Tipo}
          ID={documento.ID}
          key={documento.ID}
          Referencia={documento.Referencia}
          Cantidad={documento.Cantidad}
          Estado={documento.Estado}
        />
      ))}
    </div>
  );
}
export { InvFermentacion };
