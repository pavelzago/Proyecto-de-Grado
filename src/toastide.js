import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function PopUpAutohide(props) {
  const {handleCloseAlert}= props
  return (
    <Row>
      <Col lg={12}>
        <Toast bg={props.type} onClose={handleCloseAlert} show={props.state} delay={8000} autohide>
          <Toast.Header>
            <strong className="me-auto">{props.title}</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>{props.text}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export {PopUpAutohide};