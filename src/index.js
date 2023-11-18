import { sequelize } from "./database/database.js";
import app from "./app.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Todo correcto con la db mi papá");

    const server = app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en el puerto 4000");
    });

    // Captura de errores en el servidor
    server.on("error", (error) => {
      console.error("Error al iniciar el servidor:", error);
    });
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
}

main();
