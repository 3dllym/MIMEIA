// server.js
const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración Cloudinary
cloudinary.config({
  cloud_name: "dfjoctj0t",
  api_key: "989161745214294",
  api_secret: "jTGgTGvZ8RHHxv0HClXJxlzXhjo",
});

// Middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "calendario.html"));
});

// Subida de fotos
app.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.foto) {
      return res.status(400).send("No se seleccionó ninguna foto.");
    }

    const file = req.files.foto;

    const result = await cloudinary.uploader.upload(file.tempFilePath || file.data, {
      upload_preset: "subidas_diarias",
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al subir la foto.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});
