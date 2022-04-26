import React from 'react';

function ModalEq(props){
    return(
        <div className="card mt-3">
          <div className="card-header title fw-bold">
          {props.Referencia}
          </div>
          <div className="card-body">
            <p className="card-text">ID: {props.ID}</p>
            <p className="card-text">Descripcion: {props.Descripcion}</p>
            <p className="card-text">Tiempo: {props.Tiempo}</p>
            <p className="card-text">Capacidad: {props.Capacidad}</p>
            <p className="card-text">Estado: {props.Estado}</p>
          </div>
        </div>    
    );
}
export{ModalEq};