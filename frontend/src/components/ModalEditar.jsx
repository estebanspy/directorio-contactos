import { useState } from "react";

function ModalEditar({contacto, onCerrar, onGuardar, error}) {
    const [nombre, setNombre] = useState(contacto.nombre);
    const [email, setEmail] = useState(contacto.email ?? "");
    const [telefono, setTelefono] = useState(contacto.telefono);
    const [tipoContacto, setTipoContacto] = useState(contacto.tipoContacto);

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