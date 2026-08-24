function TarjetaContacto({id, nombre, email, telefono, tipoContacto, onBorrar}) {
    return (
        <article className="tarjeta" >
            <h3>{nombre}</h3>
            <p>{email}</p>
            <p>{telefono}</p>
            <span>{tipoContacto}</span>
            <button onClick={()=> onBorrar(id)}>Borrar</button>
        </article>
    );
}

export default TarjetaContacto;