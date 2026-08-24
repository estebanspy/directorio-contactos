function TarjetaContacto({nombre, email, telefono, tipoContacto}) {
    return (
        <article className="tarjeta" >
            <h3> {nombre} </h3>
            <p>{email}</p>
            <p>{telefono}</p>
            <span>{tipoContacto}</span>
        </article>
    );
}

export default TarjetaContacto;