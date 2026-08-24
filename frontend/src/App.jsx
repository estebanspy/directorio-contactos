import './App.css'
import TarjetaContacto from './components/TarjetaContacto';

function App() {

  const contactos = [
    { id: 1, nombre:"esteban", email: "esteban@gmail.com", telefono: "100 200 300", tipoContacto: "amigo" },
    { id: 2, nombre:"diana", email: "diana@gmail.com", telefono: "300 200 300", tipoContacto: "amigo" },
    { id: 3, nombre:"maximo", email: "maximo@gmail.com", telefono: "300 200 100", tipoContacto: "amigo" }
  ];

  return (
    <>
      <h1>Contactos</h1>
      {contactos.map(contacto => (
        <TarjetaContacto
          key={contacto.id}
          nombre={contacto.nombre}
          email={contacto.email}
          telefono={contacto.telefono}
          tipoContacto={contacto.tipoContacto}
        />
      ))}
    </>
  )
}

export default App
