const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar la conexión con la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Cambia esto por la contraseña de tu MySQL
  database: "urbanGoDB",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa con la base de datos");
});

// Registro de usuario
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(query, [email, hashedPassword], (err, result) => {
    if (err) {
      res.status(500).send("Error al registrar el usuario");
    } else {
      res.status(200).send("Usuario registrado con éxito");
    }
  });
});

// Login de usuario
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      res.status(500).send("Error en el servidor");
      return;
    }
    if (results.length === 0) {
      res.status(401).send("Usuario no encontrado");
      return;
    }

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).send("Contraseña incorrecta");
    } else {
      res.status(200).send("Inicio de sesión exitoso");
    }
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
