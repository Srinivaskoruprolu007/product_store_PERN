import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config(); // load env variables from .env file

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// build the connection string
const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

// initialize the Neon SQL client
export const sql = neon(connectionString);

// optional : log the success message
console.log(`Connected to ${PGDATABASE} on ${PGHOST} as ${PGUSER}`); // remove on production
