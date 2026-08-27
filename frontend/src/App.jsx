import './App.css'
import TarjetaContacto from './components/TarjetaContacto';
import { useState, useEffect } from 'react';
import FormularioContacto from './components/FormularioContacto';
import ModalEditar from './components/ModalEditar';

function App() {

  const [contactos, setContactos] = useState([]);

  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  const [errorEnEdicion, setErrorEnEdicion] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() =>{
    fetch('http://localhost:3001/api/contactos')
      .then(res => {
        if (!res.ok) {
          return res.json().then(datosError => {
            throw new Error(datosError.error);
          });
        }
        return res.json();
      })
      .then(datos => setContactos(datos))
      .catch(error => {
        console.error("Error al cargar los contactos:", error);
        setError(error.message);
      });
  }, [])



  const anadirContacto = (datos) => {

    setError(null);

    fetch('http://localhost:3001/api/contactos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(datosError => {
            throw new Error(datosError.error);
            
          });
        }
        return res.json();
      })
      .then(contactoCreado => setContactos([...contactos, contactoCreado]))
      .catch(error => {
        console.error("Error al crear contacto:", error);
        setError(error.message);
      })
  };



  const borrarContacto = (id) => {

    setError(null);

    fetch(`http://localhost:3001/api/contactos/${id}`, {
      method: 'DELETE'
    })
      .then(res =>  {
        if (!res.ok) {
          throw new Error("No se pudo borrar el contacto");
        }
        setContactos(contactos.filter(c => c.id !== id));
      })
      .catch(error => {
        console.error("Error al borrar:", error);
        setError(error.message);
      });
  };



  const empezarEdicion = (id) => {
    setErrorEnEdicion(null);

    const contactoEncontrado = contactos.find(c => c.id === id);
    setContactoEnEdicion(contactoEncontrado);
  };

  const cerrarModal = () => {
    setContactoEnEdicion(null);
    setErrorEnEdicion(null);
  }

  const actualizarContacto = (id, datos) => {
    fetch(`http://localhost:3001/api/contactos/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(datosError => {
            throw new Error(datosError.error);            
          });
        }
        return res.json();
      })
      .then(contactoActualizado => {
        setContactos(contactos.map(c => c.id === id ? contactoActualizado : c)); 
        cerrarModal();
      })
      .catch(error => {
        console.error("Error al actulizar:", error);
        setErrorEnEdicion(error.message);
      });
  };



  return (
    <>
      <h1>Contactos</h1>

      {error && <p className="mensaje-error">{error}</p> }

      {contactoEnEdicion && (
        <ModalEditar
          contacto={contactoEnEdicion}
          onCerrar={cerrarModal}
          onGuardar={actualizarContacto}
          error={errorEnEdicion}
        />
      )}

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
          onEditar={empezarEdicion}
        />
      ))}
    </>
  )
}

export default App
