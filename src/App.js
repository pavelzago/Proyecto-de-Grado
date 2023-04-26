import React, { useState } from "react";
import Login from "./Login";
import app from "./FireBase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Home";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const Auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [usuario, setUsuario] = useState(null);

  const SetFunctionAndRol = (usuario) => {
    console.log(usuario);
    GetRol(usuario.uid).then((rol) => {
      const userData = {
        email: usuario.email,
        uid: usuario.uid,
        rol: rol,
      };
      setUsuario(userData);
      console.log(userData);
    });
  };
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      if (!usuario) {
        SetFunctionAndRol(user);
      }
    } else {
      setUsuario(null);
    }
  });
  //Revisar no trae Dato con el ID
  const GetRol = async (uid) => {
    var RolUser = "";
    const productFinish = await getDoc(doc(db, `Users/${uid}`));
    RolUser = productFinish.data().Rol;
    return RolUser;
  };

  return <div>{usuario ? <Home user={usuario} /> : <Login />}</div>;
}

export default App;
