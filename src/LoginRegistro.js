import React, { Component } from "react";
import app from "./FireBase/firebaseConfig";
import "./Login.css";
import Logo from "./Imagenes/Logo.png";
import Alert from "react-bootstrap/Alert";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, Router, useNavigate, NavLink, Route, Switch } from "react-router-dom";
import { RegistroUser } from "./RegistroUser";
import { MenuButton } from "./MenuButton";

const Auth = getAuth(app);

class LoginRegistro extends Component {
  usuario = React.createRef();
  contraseña = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      buttonregister: false,
    };
    //Este enlace es necesario para hacer que `this` funcione en el callback
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.navigateRegister = this.navigateRegister.bind(this);
  }

  login(e) {
    e.preventDefault();
    var misusuario = this.usuario.current.value;
    var micontraseña = this.contraseña.current.value;

    signInWithEmailAndPassword(Auth, misusuario, micontraseña)
      .then((u) => {})
      .catch(function(error) {
        console.log(error);
      });
  }

  navigateRegister() {
    this.setState({ buttonregister: true });
  }

  signup(e) {
    e.preventDefault();
    var miusuario = this.usuario.current.value;
    var micontraseña = this.contraseña.current.value;
    const infousuario = createUserWithEmailAndPassword(
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
    console.log(infousuario);
  }

  render() {
    return (
      <div className="container-fluid h-100 position-absolute">
        <div className="row justify-content-start h-100">
          <div className="col-6 BannerLogin"></div>
          <div className="col-6 d-flex justify-content-center text-center">
            <div className="mt-3 ms-3">
              <img className="Logo" src={Logo} alt="Logo" />
              <h4 className="mb-3 Titulos">Inicio Sesión</h4>
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
                <button
                  className="ButtonLogin mb-3"
                  type="submit"
                  onClick={this.login}
                >
                  Login
                </button>
                <br />
                <a href="/Registro">Text</a>
                {/* <button className="ButtonRegister" onClick={this.navigateRegister}>
                  Registrarse
                </button> */}
              </form>
              <Alert show={this.state.show} variant="success">
                <p>Registro exitoso!</p>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export {LoginRegistro};