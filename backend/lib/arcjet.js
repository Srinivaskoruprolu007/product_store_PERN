import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config(); // load env variables from .env file

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // shield rule : Basic security checks
    shield({
      mode: "LIVE", // use "DRY RUN" initially to test without blocking
    }),
    // detectBot rule : Detects bots
    detectBot({
      mode: "LIVE",
      block: ["AUTOMATED"],
      allow: ["search"], // allow search bots
    }),
    // rate limiting rules
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});
