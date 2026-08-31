import './App.css'
import TarjetaContacto from './components/TarjetaContacto';
import { useState, useEffect } from 'react';
import FormularioContacto from './components/FormularioContacto';
import ModalEditar from './components/ModalEditar';

/**
 * 
 * @typedef {object} Contacto 
 * @property {number} id - identificador unico, generado por el servidor
 * @property {string} nombre - nombre del contacto
 * @property {string} [email] - correo electronico del contacto
 * @property {string} telefono - telefono del contacto
 * @property {string} tipoContacto - tipo del contacto (amigo, trabajo, otro)
 */

/**
 * Componente raiz de la aplicacion.
 * 
 * gestiona el estado global de los contactos y centraliza toda la 
 * comunicacion con la API REST. los componentes hijos son de presentacion:
 * reciben datos por props y notifican acciones mediante callbacks, sin hacer
 * peticiones por su cuenta.
 * 
 * @component
 * @returns {JSX.Element}
 * 
 */
function App() {

  /**@type {[Contacto[], Function]} lista de contactos cargada desde la API */
  const [contactos, setContactos] = useState([]);

  /**@type {[Contacto|null, Function]} Contacto en edicion, null cierra el modal */
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  /**@type {[string|null, Function]} Error mostrado dentro del modal de edicion */
  const [errorEnEdicion, setErrorEnEdicion] = useState(null);

  /**@type {[string|null, Function]} Error de las operaciones de la pagina */
  const [error, setError] = useState(null);

  /**@type {[boolean, Function]} Indica si la carga inicial sigue en curso */
  const [cargando, setCargando] = useState(true);

  /**
   * Carga la lista de contactos al montar el componente.
   * el array de dependencias vacio garantiza que se ejecute una sola vez
   */
  useEffect(() =>{
    fetch('http://localhost:3001/api/contactos')
      .then(res => {
        // fetch no rechaza la promesa ante errores HTTP (400, 404, 500),
        // solo ante fallos de red. Sin esta guarda, el objeto de error
        // entraria en el estado como si fuera una lista valida.
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
      })
      // finally se ejecuta tanto si la promesa se resuelve como si se
      // rechaza, evitando repetir setCargando(false) en then y en catch 
      .finally(() => setCargando(false));
  }, [])


/**
 * Crea un contacto en el servidor y la anade al estado local
 * 
 * @param {{nombre: string, email: string, telefono: string, tipoContacto: string}} datos - datos del formulario
 * @returns {void} 
 */
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
      // se guarda el contacto que devuelve la API, no el enviado
      // porque el id lo genera el servidor.
      .then(contactoCreado => setContactos([...contactos, contactoCreado]))
      .catch(error => {
        console.error("Error al crear contacto:", error);
        setError(error.message);
      })
  };


/**
 * Elimina un contacto del servidor y del estado local.
 * 
 * @param {number} id - Id del contacto a eliminar
 * @returns {void} 
 */
  const borrarContacto = (id) => {

    setError(null);

    fetch(`http://localhost:3001/api/contactos/${id}`, {
      method: 'DELETE'
    })
      .then(res =>  {
        // la ruta responde 204 sin cuerpo,por eso no se llama a res.json().
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


/**
 * Abre el modal de edicion con el contacto seleccionado.
 * Busca el objeto completo en el estado local, sin pedirlo a la API,
 * por que la lista ya esta cargada en memoria
 * 
 * @param {number} id - Id del contacto a editar
 * @returns {void} 
 */
  const empezarEdicion = (id) => {
    setErrorEnEdicion(null);

    const contactoEncontrado = contactos.find(c => c.id === id);
    setContactoEnEdicion(contactoEncontrado);
  };


  /**
   * Cierra el modal y descarta cualquier error de edicion pendiente
   * @returns {void}
   */
  const cerrarModal = () => {
    setContactoEnEdicion(null);
    setErrorEnEdicion(null);
  }


  /**
   * Actualiza un contacto en el servidor y refleja el cambio en el estado.
   * El modal solo se cierra si la API  responde correctamente, para que un fallo
   * no haga perder los valores introducidos.
   * 
   * @param {number} id - Id del contacto a actualizar 
   * @param {{nombre: string, email: string, telefono: string, tipoContacto: string}} datos - valores editados 
   * @returns {void}
   */
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
        // .map crea un array nuevo con el contacto sustituido. mutar el objeto existente
        // no cambiaria la referencia del array y react no detectaria el cambio.
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

      {cargando && <p>Cargando contactos...</p>}

      {!cargando && contactos.length === 0 && <p>Todavia no hay contactos.</p> }

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
