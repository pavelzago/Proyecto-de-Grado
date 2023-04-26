import React, { Component } from "react";
import app from "./FireBase/firebaseConfig";
import "./Login.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { setDoc, doc, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Modal, Button } from "react-bootstrap";

const db = getFirestore(app);
const Auth = getAuth(app);

class RegistroUser extends Component {
  usuario = React.createRef();
  contraseña = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      show: " ",
      dropdown: false,
      selectDropModal: "Rol",
    };

    //Este enlace es necesario para hacer que `this` funcione en el callback
    this.signup = this.signup.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    console.log(this.props.show)
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    console.log(this.props.show)
    this.setState({ show: this.props.show });
  }

  abrircerrarDrop() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  selectTipoMP(variant) {
    if (variant === "Ing") {
      this.setState({ selectDropModal: "Ingeniero" });
    }
    if (variant === "OI") {
      this.setState({ selectDropModal: "Inventario" });
    }
    if (variant === "OC") {
      this.setState({ selectDropModal: "Calidad" });
    }
  }

  signup(e) {
    e.preventDefault();
    var miusuario = this.usuario.current.value;
    var micontraseña = this.contraseña.current.value;
    const info = async () => {
      const infousuario = await createUserWithEmailAndPassword(
        Auth,
        miusuario,
        micontraseña
      )
        .then((u) => {
          return u;
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log(infousuario.user.uid);
      this.saveUser(
        miusuario,
        this.state.selectDropModal,
        infousuario.user.uid
      );
    };
    info();
  }

  saveUser(email, rol, uid) {
    console.log(email, rol, uid);
    const save = async () => {
      setDoc(doc(db, "Users", uid), {
        Email: email,
        Rol: rol,
      });
    };
    save();
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <div className="d-flex justify-content-center text-center">
                <div className="mt-3 ms-3">
                  <form>
                    <div>
                      <label className="Titulos" htmlFor="exampleInputEmail">
                        Correo electronico:
                      </label>
                      <br />
                      <input
                        className="Input"
                        type="email"
                        name="email"
                        id="exampleInputEmail"
                        ref={this.usuario}
                      ></input>
                    </div>
                    <div className="p-4">
                      <label className="Titulos" htmlFor="exampleInputPassword">
                        Contraseña:{" "}
                      </label>
                      <br />
                      <input
                        className="Input"
                        type="password"
                        name="password"
                        id="exampleInputPassword"
                        ref={this.contraseña}
                      ></input>
                    </div>

                    <div className="w-100">
                      <label className="Titulos" htmlFor="exampleInputPassword">
                        Seleccione el Rol para el usuario a Registrar:{" "}
                      </label>
                      <DropdownButton
                        className=" w-100"
                        variant="btn dropDown"
                        title={this.state.selectDropModal}
                        id="input-group-dropdown-1"
                        onClick={() => this.abrircerrarDrop()}
                      >
                        <Dropdown.Item onClick={() => this.selectTipoMP("Ing")}>
                          Ingeniero
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.selectTipoMP("OI")}>
                          Operador Inventario
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.selectTipoMP("OC")}>
                          Operador Calidad
                        </Dropdown.Item>
                      </DropdownButton>
                      <br />
                    </div>
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.signup}>
            Registrar Usuario
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export { RegistroUser };
