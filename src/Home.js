import React,  { useEffect, useState } from "react";

import { getAuth, signOut } from "firebase/auth";
import app from "./FireBase/firebaseConfig";

//PAGINAS
import {MenuInventario } from "./MenuInventario";
import {MenuAdmin} from "./MenuAdmin";
import { MenuCalidad } from "./MenuCalidad";

// ICONOS
import { AiFillHome } from "react-icons/ai";
import { MdAssignment, MdNotificationsActive } from "react-icons/md";
import {
  BsFillCalendarDateFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";
import { GrDesktop } from "react-icons/gr";

const contentButton = [
  { name: "Inicio", url: "/Inicio", icon: <AiFillHome /> },
  { name: "Proceso General", url: "/ProcesoGeneral", icon: <MdAssignment /> },
  { name: "Cronograma", url: "/Cronograma", icon: <BsFillCalendarDateFill /> },
  { name: "Inventario", url: "/Inventario", icon: <FaClipboardCheck /> },
  { name: "Equipos y proceso", url: "/Equipos", icon: <GrDesktop /> },
  { name: "Calidad", url: "/Calidad", icon: <BsFillBookmarkCheckFill /> },
  { name: "Notificaciones", url: "/Notificaciones", icon: <MdNotificationsActive /> },
];

const Auth = getAuth(app);

function Home(user) {
  const [renderPag, setRenderPag] = useState("");
  useEffect(() => {
    if(user.user.rol === "Ingeniero"){
      setRenderPag(<MenuAdmin/>);
    } else if (user.user.rol === "Inventario"){
      setRenderPag(<MenuInventario/>);
    }else if (user.user.rol === "Calidad"){
      setRenderPag(<MenuCalidad/>);
    }
    console.log("oli")
    console.log(user.user.rol)
  },[]);

  const logOut = () => {
    signOut(Auth);
  };

  return (
    <div>
      {renderPag}
    </div>
  );
}

export default Home;
