import { useState } from "react";

function FormularioContacto({onCrear}) {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tipoContacto, setTipoContacto] = useState("amigo");

    const manejarEnvio = (e) => {
        e.preventDefault();

        onCrear({nombre,email,telefono,tipoContacto});

        setNombre("");
        setEmail("");
        setTelefono("");
        setTipoContacto("amigo");
    };

    return (
        <form onSubmit={manejarEnvio} >
            <input 
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}         
            />

            <input 
                type="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            />

            <input 
                type="text"
                placeholder="300 400 500"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)} 
            />

            <select 
                value={tipoContacto}
                onChange={(e) => setTipoContacto(e.target.value)}
            >
                <option value="amigo">Amigo</option>
                <option value="trabajo">Trabajo</option>
                <option value="otro">Otro</option>

            </select>

            <button type="submit">Añadir contacto</button>
        
        </form>
    );
    
}

export default FormularioContacto;