import { useState } from "react";

/**
 * ventana modal para editar un contacto seleccionado.
 * 
 * se renderiza de forma condicional desde App: solo existe en el DOM
 * mientras hay un contacto en edicion. de esta manera el componente se 
 * monta de nuevo cada vez se abre, y los estados pueden inicializarse 
 * directamente desde los props sin necesidad de useEffect para sincronizarlos.
 * 
 * no modifica datos por si mismo: entrega los valores editados al padre
 * mediante onGuardar.
 * 
 * @component 
 * @param {object} props
 * @param {Contacto} props.contacto - contacto que se esta editando, sus valores inicializan los campos del formulario.
 * @param {() => void} props.onCerrar - callback del padre para cerrar el modal sin guardar cambios
 * @param {(id: number, datos: {nombre: string, email: string, telefono: string, tipoContacto: string}) => void} props.onGuardar - callback del padre que envia los cambios a la API
 * @param {string|null} props.error - mensaje de error devuelto por la API, o null si no hay ninguno 
 * @returns {JSX.Element}
 */
function ModalEditar({contacto, onCerrar, onGuardar, error}) {

    /**@type {[string, Function]} nombre editable, precargado con el valor actual */
    const [nombre, setNombre] = useState(contacto.nombre);

    /**@type {[string, Function]} email editable, precargado con el valor actual, no es un valor obligatorio */
    const [email, setEmail] = useState(contacto.email ?? "");

    /**@type {[string, Function]} telefono editable, precargado con el valor actual */
    const [telefono, setTelefono] = useState(contacto.telefono);

    /**@type {[string, Function]} tipo de contacto editable, precargado con el valor actual */
    const [tipoContacto, setTipoContacto] = useState(contacto.tipoContacto);

    /**
     * entrega al padre el id del contacto y los valores editados.
     * el modal no cierra por si mismo: lo hace App solo si la API responde
     * correctamente, para que un fallo no haga perder lo escrito.
     */
    const manejarGuardar = () => {
        onGuardar(contacto.id, {nombre,email,telefono,tipoContacto});
    };

    return (
        <div className="overlay">
            <div className="modal">
                <h2>Editar Contacto</h2>

                {error && <p className="mensaje-error">{error}</p> }

                <input 
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}                 
                />

                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <input 
                    type="text"
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

                <button onClick={manejarGuardar}>Guardar</button>
                <button onClick={onCerrar}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditar;