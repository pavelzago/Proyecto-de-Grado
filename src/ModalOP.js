import React from 'react';

function ModalOP(props){
    return(
        <div className="card mt-3 ">
          <div className="card-header title fw-bold">
          ID: {props.Referencia}
          </div>
          <div className="card-body">
            {/* <p className="card-text">ID: {props.ID}</p> */}
            <p className="card-text">Capacidad Alcohol Carburante a producir: {props.Capacidad} Lts</p>
            <p className="card-text">Estado: {props.Estado}</p>
          </div>
        </div>    
    );
}
export{ModalOP};