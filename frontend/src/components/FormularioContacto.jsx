import { useState } from "react";

/**
 * formulario controlado para dar de alta un contacto
 * mantiene su propio estado mientras se escribe y entrega los datos 
 * al padre mediante onCrear al enviar.
 *  
 * @component
 * @param {object} props
 * @param {(datos: {nombre: string, email: string, telefono: string, tipoContacto: string}) => void} props.onCrear - callback que recibe los datos del formulario al envirlo
 * @returns {JSX.Element}
 */
function FormularioContacto({onCrear}) {

    /**@type {[string, Function]} nombre introducido en el formulario */
    const [nombre, setNombre] = useState("");

    /**@type {[string, Function]} email introducido en el formulario */
    const [email, setEmail] = useState("");

    /**@type {[string, Function]} telefono introducido en el formulario */
    const [telefono, setTelefono] = useState("");

    /**@type {[string, Function]} tipoContacto se incia en "amigo" por que un selecte siempre debe de tener una opcion valida seleccionada */
    const [tipoContacto, setTipoContacto] = useState("amigo");


    /**
     * envia los datos al padre y limpia los campos.
     * cancela el comportamiento por defecto del formulario para
     * evitar que la pagina se cargue 
     * 
     * @param {React.FormEvent} e - Evento de envio del formulario 
     */
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