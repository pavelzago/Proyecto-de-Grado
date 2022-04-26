import React from "react";

function ModalInv(props) {
  return (
    <div className="col">
      <div className="card mt-3">
        <div className="card-header title fw-bold">{props.Tipo}</div>
        <div className="card-body">
          <p className="card-text">Cantidad: {props.Cantidad} Lts.</p>
          <p className="card-text">Lote: {props.Referencia}</p>
          <p className="card-text">Estado: {props.Estado}</p>
        </div>
      </div>
    </div>
  );
}
export { ModalInv };
