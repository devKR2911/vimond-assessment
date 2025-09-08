import express from "express";
import dotenv from "dotenv";

import intervalRoutes from "./routes/interval.routes";

const app = express();

// For fetching payload from post call
app.use(express.json());

// Adding environment variables
dotenv.config();

app.use("/api/interval-checker", intervalRoutes);

export default app;
