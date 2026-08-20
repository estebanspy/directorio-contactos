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
]

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
 * arranca el servidor en el puerto defenido arriba 
 */

app.listen(puerto, ()=>{
    console.log(`servidor iniciado y escuchando en http://localhost:${puerto}`);
    
})