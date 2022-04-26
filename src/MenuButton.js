import React from "react";
import { Link } from "react-router-dom";

function MenuButton(props) {
  return (
    <div className="d-grid gap-2 mt-4">
      <Link to={props.url} className="btn bg-transparent text-start fs-5 ">
        <div className="row row-cols-2">
       <div className="col-3 p-0 text-center">{props.icon} </div> 
       <div className="col-9 p-0 align-middle">{props.name}</div> 
       </div>
      </Link>
    </div>
  );
}

export { MenuButton };
