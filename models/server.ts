import express, { Application } from "express";
import userRouter from "../routes/user";
import cors from "cors";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // DB Connection
    this.dbConnection();

    //middlewares
    this.middlewares();

    // Define routes
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("database online");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read body
    this.app.use(express.json());

    // public folder
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

export default Server;
