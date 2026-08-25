import './App.css'
import TarjetaContacto from './components/TarjetaContacto';
import { useState, useEffect } from 'react';
import FormularioContacto from './components/FormularioContacto';

function App() {

  const [contactos, setContactos] = useState([]);

  useEffect(() =>{
    fetch('http://localhost:3001/api/contactos')
      .then(res => res.json())
      .then(datos => setContactos(datos))
      .catch(error => console.error("Error al cargar los contactos:", error));
  }, [])

  const anadirContacto = (datos) => {
    fetch('http://localhost:3001/api/contactos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(contactoCreado => setContactos([...contactos, contactoCreado]))
      .catch(error => console.error("Error al crear contacto:", error))
  };

  const borrarContacto = (id) => {
    fetch(`http://localhost:3001/api/contactos/${id}`, {
      method: 'DELETE'
    })
      .then(() => setContactos(contactos.filter(c => c.id !== id)))
      .catch(error => console.error("Error al borrar:", error));
  };

  return (
    <>
      <h1>Contactos</h1>

      <FormularioContacto onCrear={anadirContacto}/>

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
