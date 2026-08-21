import express from "express";
import cors from "cors";

const app = express();
const puerto = 3001;

app.use(cors());
app.use(express.json());

/**
 * @typedef {object} contacto 
 * @property {number} id - identificador unico del contacto
 * @property {string} nombre - nombre del contacto 
 * @property {string} email - email personal del contacto 
 * @property {string} telefono - telefeno del contacto 
 * @property {string} tipoContacto - referencia a que tipo de contacto es 
 */
let contactos = [
    {
        id: 1, 
        nombre: 'esteban', 
        email: 'estebanspy@gmail.com',
        telefono: '+34 642 481 427',
        tipoContacto: 'amigo'

    },

    {
        id: 2, 
        nombre: 'diana', 
        email: 'diana@gmail.com',
        telefono: '+34 611 216 283',
        tipoContacto: 'amigo'

    }
];

const TIPOS_CONTACTOS_VALIDOS = ['amigo', 'trabajo', 'otro'];

/**
 * GET /api/contactos 
 * devuelve el array completo de contactos en formato JSON.
 */

app.get('/api/contactos', (req,res) => {
    res.status(200).json(contactos);
});

/**
 * GET /api/contactos/:id
 * devuelve un contaco en especifico en relacion a su id unico 
 */

app.get('/api/contactos/:id', (req,res) => {
    const id = Number(req.params.id);

    const contacto = contactos.find(c => c.id === id );

    if (!contacto) {
        return res.status(404).json({error: "contacto no encontrado"});
    }

    res.status(200).json(contacto);

});

/**
 * POST /api/contactos
 * crea un nuevo contacto con un id unico y no repetido
 */

app.post('/api/contactos', (req,res) =>{
    const {nombre, email, telefono, tipoContacto} = req.body;

    if (!nombre || !telefono || !tipoContacto) {
        return res.status(400).json({error: "nombre, telefono y tipo de Contacto son obligatorios para crear el contacto"});
    }

    if (!TIPOS_CONTACTOS_VALIDOS.includes(tipoContacto)) {
        return res.status(400).json({error: `el tipo de contacto debe de ser uno de: ${TIPOS_CONTACTOS_VALIDOS.join(', ')}`});
        
    }

    const nuevoId = contactos.length > 0 ? Math.max(...contactos.map(c => c.id)) + 1 : 1;

    const nuevoContacto = {
        id: nuevoId,
        nombre,
        email,
        telefono,
        tipoContacto
    };

    contactos.push(nuevoContacto);
    res.status(201).json(nuevoContacto);

});

/**
 * PUT /api/contactos/:id
 * actualiza un contacto por su id
 */

app.put('/api/contactos/:id', (req,res) => {
    const id = Number(req.params.id);
    const contactoEncontrado = contactos.find(c => c.id === id);

    if (!contactoEncontrado) {
        return res.status(404).json({error: 'contacto no encontrado'});
    }

    const {nombre, email, telefono, tipoContacto} = req.body;

    if (!nombre || !telefono || !tipoContacto) {
        return res.status(400).json({error: 'para actulizar el contacto debe incluir nombre, telefono y tipo de contacto'});
    }

    if (!TIPOS_CONTACTOS_VALIDOS.includes(tipoContacto)) {
        return res.status(400).json({error: `el tipo de contacto debe de ser uno de: ${TIPOS_CONTACTOS_VALIDOS.join(',')}`});
    }

    contactoEncontrado.nombre = nombre;
    contactoEncontrado.email = email;
    contactoEncontrado.telefono = telefono;
    contactoEncontrado.tipoContacto = tipoContacto;

    res.status(200).json(contactoEncontrado);

});

/**
 * DELETE /api/contactos/:id
 * elimina un contacto por su id
 */

app.delete('/api/contactos/:id', (req,res) => {
    const id = Number(req.params.id);
    const contactoEncontrado = contactos.find(c => c.id === id);

    if (!contactoEncontrado) {
        return res.status(404).json({error: "contacto no encontrado"});
    }

    contactos = contactos.filter(c => c.id !== id);

    res.status(204).end();

});




/**
 * arranca el servidor en el puerto defenido arriba 
 */

app.listen(puerto, ()=>{
    console.log(`servidor iniciado y escuchando en http://localhost:${puerto}`);
    
})