import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import routes from "./routes";

class App {
  app: Express;

  constructor() {
    this.app = express();
  }

  async start() {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ];

    this.app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "DELETE", "OPTIONS", "PATCH"],
        allowedOrigins: ["Content-Type", "Authorization", "X-Session-Id"]
      })
    );

    // this.middlewares();

    this.routes();

    // this.app.use(errorHandler);

    this.app.listen(1337, () => {
      console.log("Server Started");
    })
  }

  routes(): void {
    this.app.use(routes);
  }

  middlewares(): void {
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

}

export default new App();

