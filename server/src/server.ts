import express from "express";
import cors from "cors";
import { Thing, Things } from "../../domain/Thing";

const port = 5000;
const server = express();

// TODO: Set this value dynamically
server.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://172.22.53.52:8080" /* WSL quirk -- sometimes localhost doesn't work */ ]
}))

server.get("/thing/:id", async (req, resp) => {
  const d: Thing = await Things.make(`GET thing from the server ${req.params.id}`, new Date().toISOString());

  return resp.json(d);
});

server.get("/thing/:id/slow", async (req, resp) => {
  const d: Thing = await Things.make(`GET slow thing from the server ${req.params.id}`, new Date().toISOString());

  setTimeout(() => {
    return resp.json(d);
  }, 2000);
});

server.post("/thing/:id", async (req, resp) => {
  const d: Thing = await Things.make(`POST thing from the server ${req.params.id}`, new Date().toISOString());

  return resp.json(d);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
