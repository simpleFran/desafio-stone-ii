import fastify from "fastify";
import cors from "@fastify/cors";
import { dockerRoutes } from "./routes/docker.routes.js";

export const app = fastify();
app.register(cors)
app.register(dockerRoutes)
app.get("/", async (req, reply) => {
  try {
    reply.status(200).send({ message: "Servidor respondeu. Isso é um teste" });
  } catch (err: any) {
    console.error("Erro detalhado", err.message);
  }
});


