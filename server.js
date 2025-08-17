const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Subir foto
app.post('/subir', upload.single('foto'), (req, res) => {
  if(req.file){
    res.redirect('/calendario.html');
  } else {
    res.send('Error al subir la foto');
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:3000`));
