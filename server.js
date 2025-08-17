const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static("uploads")); // Servir las fotos subidas

// Configuración de multer (guardar imágenes en carpeta /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Ruta para subir una foto
app.post("/upload", upload.single("foto"), (req, res) => {
  if (!req.file) return res.status(400).send("No se subió archivo.");
  res.json({ url: `http://localhost:${PORT}/${req.file.filename}` });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});
