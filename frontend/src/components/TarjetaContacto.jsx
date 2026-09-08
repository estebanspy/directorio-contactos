/**
 * tarjeta que muestra los datos de un contacto con acciones de borrar y editar.
 *
 * @component
 * @param {object} props
 * @param {number} props.id - Id del contacto, se envia a los callbacks de los botones
 * @param {string} props.nombre - nombre del contacto a mostrar
 * @param {string} props.email - email a mostrar
 * @param {string} props.telefono - telefono a mostrar
 * @param {string} props.tipoContacto - tipo de contacto a mostrar
 * @param {(id: number) => void} props.onBorrar - callback del padre para eliminar (boton borrar)
 * @param {(id: number) => void} props.onEditar - callback del padre para editar (boton editar)
 * @returns {JSX.Element}
 */
function TarjetaContacto({
  id,
  nombre,
  email,
  telefono,
  tipoContacto,
  onBorrar,
  onEditar,
}) {
  return (
    <article className="tarjeta">
      <h3 className="tarjeta-nombre">{nombre}</h3>
      <p className="tarjeta-dato">{email}</p>
      <p className="tarjeta-dato">{telefono}</p>
      <span className={`badge badge-${tipoContacto}`}>{tipoContacto}</span>
      <div className="tarjeta-acciones">
        <button className="boton boton-peligro" onClick={() => onBorrar(id)}>
          Borrar
        </button>
        <button className="boton boton-secundario" onClick={() => onEditar(id)}>
          Editar
        </button>
      </div>
    </article>
  );
}

export default TarjetaContacto;
