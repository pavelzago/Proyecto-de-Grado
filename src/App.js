import React, {useState} from "react";
import Login from "./Login";
import app from "./FireBase/firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Home from "./Home";

const Auth= getAuth(app);

function App() {
  const [usuario, setUsuario]= useState(null);
  onAuthStateChanged(Auth, (usuario)=>{
    if(usuario){
      setUsuario(usuario)
    }else{
      setUsuario(null);
    }
  });
  return (
    <div>
      {usuario ? <Home/> : <Login/>}
    </div>
  );
}

export default App;
