# Directorio de Contactos con CRUD Completo

app full stack Directorio de contactos con CRUD completo backend
node.js/Express frontend JavaScript/React/Vite

## Stack

- Backend: Node.js, Express
- Frontend: React, Vite
- Almacenamiento: array en memoria (sin base de datos)

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/estebanspy/directorio-contactos.git
```

2. Entra en la carpeta /backend e instala las dependencias

```bash
cd backend
npm install
```

3. arranca el servidor en la carpeta backend

```bash
npm run dev
```

## API

| Método | Ruta               | Éxito | Errores  |
| ------ | ------------------ | ----- | -------- |
| GET    | /api/contactos     | 200   | —        |
| GET    | /api/contactos/:id | 200   | 404      |
| POST   | /api/contactos     | 201   | 400      |
| PUT    | /api/contactos/:id | 200   | 400, 404 |
| DELETE | /api/contactos/:id | 204   | 404      |

### Modelo de Datos

```json
{
  "id": 1,
  "nombre": "juan",
  "email": "juan@gmail.com",
  "telefono": "+34 200 300 400",
  "tipoContacto": "amigo"
}
```

| Campo        | Tipo   | Obligatorio | Nota                                |
| ------------ | ------ | ----------- | ----------------------------------- |
| id           | number | -           | Generado por el servidor            |
| nombre       | string | Sí          |                                     |
| email        | string | No          |                                     |
| telefono     | string | Sí          |                                     |
| tipoContacto | string | Sí          | Valores: `amigo`, `trabajo`, `otro` |
