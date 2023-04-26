import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";

function ModalAgregarOP(props) {
    const [inputAddOP, setInputAddOP] = useState(false);
    const {handleClose}= props
    const {dataInput}= props

    const handleChange = (event) => {
        setInputAddOP(event.target.value);
      };

  return (
    <Modal show={props.show} onHide={handleClose}>
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
                value={inputAddOP}
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
        <Button variant="primary" onClick={(e) => dataInput(inputAddOP)}>
          +Agregar Actividad
        </Button>
      </Modal.Footer>
    </Modal>
    /* ----------ModalClose------ */
  );
}
export { ModalAgregarOP };
