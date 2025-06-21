import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


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

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
