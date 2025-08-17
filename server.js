const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Carpeta de uploads
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta para subir imágenes
app.post('/subir', upload.single('foto'), (req, res) => {
    res.send('¡Foto subida con éxito!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
