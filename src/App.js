import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//PAGINAS
import { MainMenu } from "./MainMenu";
import { MenuButton } from "./MenuButton";
import { ProcesoGeneral } from "./ProcesoGeneral";
import { Cronograma } from "./Cronograma";
import { Equipos } from "./Equipos";
import { Inventario } from "./Inventario";
import { Calidad } from "./Calidad";



// ICONOS
import { AiFillHome  } from "react-icons/ai";
import { MdAssignment } from "react-icons/md";
import {
  BsFillCalendarDateFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";
import { GrDesktop } from "react-icons/gr";

const contentButton = [
  { name: "Inicio", url: "/", icon: <AiFillHome /> },
  { name: "Proceso General", url: "/ProcesoGeneral", icon: <MdAssignment /> },
  { name: "Cronograma", url: "/Cronograma", icon: <BsFillCalendarDateFill /> },
  { name: "Inventario", url: "/Inventario", icon: <FaClipboardCheck /> },
  { name: "Equipos y proceso", url: "/Equipos", icon: <GrDesktop /> },
  { name: "Calidad", url: "/Calidad", icon: <BsFillBookmarkCheckFill /> },
];

function App() {
  return (
    <Router>
      <div className="container p-0 m-0 w-100 mx">
        <div className="row row-cols-2">
          <div className="col-3 bg-light border">
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
          </div>
          <div className="col-9">
          <Switch>
            <Route path="/inicio">Inicio</Route>
            <Route path="/ProcesoGeneral">
              <ProcesoGeneral />
            </Route>
            <Route path="/Cronograma">
              <Cronograma />
            </Route>
            <Route path="/Inventario">
              <Inventario />
            </Route>
            <Route path="/Equipos">
              <Equipos />
            </Route>
            <Route path="/Calidad">
              <Calidad />
            </Route>
          </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
