import './App.css'
import TarjetaContacto from './components/TarjetaContacto';
import { useState } from 'react';

function App() {

  const [contactos, setContactos] = useState([
    { id: 1, nombre:"esteban", email: "esteban@gmail.com", telefono: "100 200 300", tipoContacto: "amigo" },
    { id: 2, nombre:"diana", email: "diana@gmail.com", telefono: "300 200 300", tipoContacto: "amigo" },
    { id: 3, nombre:"maximo", email: "maximo@gmail.com", telefono: "300 200 100", tipoContacto: "amigo" }
  ]);

  const anadirContacto = () => {
    const nuevoContacto = {id: Date.now(), nombre:"helena", email:"helena@gmail.com", telefono:"500 400 300", tipoContacto:"trabajo"};
    setContactos([...contactos, nuevoContacto]);
  };

  const borrarContacto = (id) => {
    setContactos(contactos.filter(c => c.id !== id));
  };

  return (
    <>
      <h1>Contactos</h1>

      <button onClick={anadirContacto}>
        Añadir Contacto
      </button>

      {contactos.map(contacto => (
        <TarjetaContacto
          key={contacto.id}
          id={contacto.id}
          nombre={contacto.nombre}
          email={contacto.email}
          telefono={contacto.telefono}
          tipoContacto={contacto.tipoContacto}
          onBorrar={borrarContacto}
        />
      ))}
    </>
  )
}

export default App
