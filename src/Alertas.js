import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


function Alertas(props) {
  const {handleCloseAlert}= props
  return (
    <>
        <Alert show={props.state} variant={props.type}>
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>
        {props.text}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleCloseAlert} variant="outline-success">
            X
          </Button>
        </div>
      </Alert>
    </>
  );
}

export { Alertas };



