import express from "express";
import companyRoutes from "./routes/company.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

//middlewares
app.use(express.json()); //cada vez que me lleguen respuestas en formato json, la app lo convierte a un formato de js

app.use(companyRoutes);
app.use(userRoutes);

export default app;
