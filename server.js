const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Carpeta de uploads
const uploadFolder = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para subir fotos
app.post('/upload', upload.single('foto'), (req, res) => {
    res.json({ filename: req.file.filename });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
