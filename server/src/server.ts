import express from "express";
import cors from "cors";
import { Thing, Things } from "../../domain/Thing";

const port = 5000;
const app = express();

// TODO: Set this value dynamically
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://172.22.53.52:8080" /* WSL quirk -- sometimes localhost doesn't work */ ]
}))

app.get("/thing/:id", async (req, resp) => {
  const d: Thing = await Things.make(`GET thing from the server ${req.params.id}`, new Date().toISOString());

  return resp.json(d);
});

app.get("/thing/:id/slow", async (req, resp) => {
  const d: Thing = await Things.make(`GET slow thing from the server ${req.params.id}`, new Date().toISOString());

  setTimeout(() => {
    return resp.json(d);
  }, 2000);
});

app.post("/thing/:id", async (req, resp) => {
  const d: Thing = await Things.make(`POST thing from the server ${req.params.id}`, new Date().toISOString());

  return resp.json(d);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
