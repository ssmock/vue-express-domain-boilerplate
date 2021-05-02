import express from "express";
import cors from "cors";
import { Thing, Things } from "../../domain/Thing";

const port = 5000;
const server = express();

// TODO: Set this value dynamically
server.use(cors({
  origin: ["http://localhost:3000"]
}))

server.get("/thing/:id", async (req, resp) => {
  const d = await Things.make(`GET thing from the server ${req.params.id}`, new Date().toISOString());

  return resp.json(d);
});

server.post("/thing/:id", async (req, resp) => {
  const d = await Things.make(`POST thing from the server ${req.params.id}`, new Date().toISOString());

  return resp.json(d);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
