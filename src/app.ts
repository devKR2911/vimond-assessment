import express from "express";

import intervalRoutes from "./routes/interval.routes";

const app = express();

// For fetching payload from post call
app.use(express.json());

app.use("/api/interval-checker", intervalRoutes);

export default app;
