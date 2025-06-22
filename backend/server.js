import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
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

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req); // protect the request
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          error: "Rate limit exceeded",
        });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          error: "Access denied suspected bot activity",
        });
      }
      // handling other denial reasons
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }
    next(); // Only call next if not denied
  } catch (error) {
    console.error("Arcject error during protection:", error);
    next(error);
  }
});

// use the product routes
app.use("/api/products", productRoutes);

// function to initialize the database (create table)
async function initializeDatabase() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      image VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`;
    console.log('Database table "products" checked/created successfully');
  } catch (error) {
    console.error('Error checking/creating database table "products":', error);
    process.exit(1);
  }
}

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error initializing database:", error);
    process.exit(1);
  });
