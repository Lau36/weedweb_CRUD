const express = require("express");
const app = express();

//middlewares -> funciones que se ejecutan antes de que llegue,
app.use(express.json()); //cada vez que me lleguen respuestas en formato json, la app lo convierte a un formato de js
app.use(express.urlencoded({ extended: false })); // cuando me manden dato en formulario, este lo procesa y lo convierte en un objeto, con eso en false solo recibo texto y no ningun tipo de imagenes

//routes
app.use(require("./routes/index.js"));
app.listen(3000);
console.log("server on port 3000");
