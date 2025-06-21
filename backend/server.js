import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import productRoutes from "./routes/product.routes.js";

dotenv.config(); // load env variables from .env file

// basic setup
const app = express();
const port = process.env.PORT || 3000;

// security middleware: Sets security headers
app.use(helmet());

// logging middlewares : HTTP request logger middleware
app.use(morgan("dev"));

// Body parser middleware : parses incoming requests with JSON payloads
app.use(express.json());

// CORS middleware : Cross-Origin Resource Sharing middleware
app.use(cors());

// use the product routes
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
