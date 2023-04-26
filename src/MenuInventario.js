import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "./FireBase/firebaseConfig";

//PAGINAS
import { MainMenu } from "./MainMenu";
import { MenuButton } from "./MenuButton";
import { ProcesoGeneral } from "./ProcesoGeneral";
import { Cronograma } from "./Cronograma";
import { Equipos } from "./Equipos";
import { Inventario } from "./Inventario";
import { Calidad } from "./Calidad";
import {Inicio} from "./Inicio";
import {Notificaciones} from "./Notificaciones";

// ICONOS
import { AiFillHome } from "react-icons/ai";
import { MdAssignment, MdNotificationsActive } from "react-icons/md";
import {
  BsFillCalendarDateFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";
import { GrDesktop } from "react-icons/gr";
import Logo from "./Imagenes/Logo.png";

const contentButton = [
  { name: "Inicio", url: "/Inicio", icon: <AiFillHome /> },
  { name: "Proceso General", url: "/ProcesoGeneral", icon: <MdAssignment /> },
  { name: "Inventario", url: "/Inventario", icon: <FaClipboardCheck /> },
  { name: "Notificaciones", url: "/Notificaciones", icon: <MdNotificationsActive /> },
];

const Auth = getAuth(app);

function MenuInventario() {
  const logOut = () => {
    signOut(Auth);
  };
  return (
    <Router>
      <div className="container-fluid h-100 position-absolute">
        <div className="row row-cols-2 h-100">
          <div className="col-3 border">
            <img className="w-100" src={Logo} alt="Logo" />
            <MainMenu>
              {contentButton.map((contentButton) => (
                <MenuButton
                  key={contentButton.name}
                  url={contentButton.url}
                  name={contentButton.name}
                  icon={contentButton.icon}
                />
              ))}
            </MainMenu>
            
            <div className="row d-flex justify-content-center">
              <hr/>
              <div className="text-center">
                <button className="ButtonLogOut" onClick={logOut}>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
          <div className="col-9">
            <Switch>
              <Route path="/Inicio"><Inicio/></Route>
              <Route path="/ProcesoGeneral">
                <ProcesoGeneral />
              </Route>
              <Route path="/Inventario">
                <Inventario />
              </Route>
              <Route path="/Notificaciones">
                <Notificaciones />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export {MenuInventario};