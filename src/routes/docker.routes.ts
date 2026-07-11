import type { FastifyInstance } from "fastify";
import { DockerController } from "../controllers/docker-controller.js";
import { DockerClientService } from "../services/docker-client.service.js";
import { dockerClient } from "../lib/docker-client.js";

const dockerClientService = new DockerClientService(dockerClient)
const dockerController = new DockerController(dockerClientService)


export async function dockerRoutes(app: FastifyInstance){

    app.post("/api/start-all",dockerController.listAllStoppedContainers)
    app.post("/api/stop-all",dockerController.listAllStartedContainers)
}