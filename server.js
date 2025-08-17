const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Carpeta de uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta para subir imágenes
app.post('/subir', upload.single('foto'), (req, res) => {
    res.redirect(req.get('referer')); // vuelve a la página de donde vino
});

// Ruta para obtener las fotos
app.get('/fotos', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) return res.json([]);
        res.json(files);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
