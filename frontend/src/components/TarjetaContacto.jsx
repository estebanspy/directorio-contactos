function TarjetaContacto({id, nombre, email, telefono, tipoContacto, onBorrar, onEditar}) {
    return (
        <article className="tarjeta" >
            <h3>{nombre}</h3>
            <p>{email}</p>
            <p>{telefono}</p>
            <span>{tipoContacto}</span>
            <button onClick={()=> onBorrar(id)}>Borrar</button>
            <button onClick={()=> onEditar(id)}>Editar</button>
        </article>
    );
}

export default TarjetaContacto;