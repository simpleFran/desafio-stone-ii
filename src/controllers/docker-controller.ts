import type { FastifyReply, FastifyRequest } from "fastify";
import type { DockerClientService } from "../services/docker-client.service.js";

export class DockerController {
  constructor(private dockerClientService: DockerClientService) {}

  public listAllStoppedContainers = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const containers =
      await this.dockerClientService.startAllStoppedContainers();

    if (containers === 0) {
      return reply.status(200).send({
        message: "Nenhum container parado foi encontrado.",
      });
    }

    return reply.status(200).send({
      message: `${containers} foram inicializados.`,
    });
  };

  public listAllStartedContainers = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ) => {
    //faz o filtro primeiro
    const containers =
      await this.dockerClientService.stopAllStartedContainers();

    if (containers === 0) {
      return reply.status(200).send({
        message: "Nenhum container startado foi encontrado.",
      });
    }

    return reply.status(200).send({
      messge: `${containers} foram pausados.`
    })
  };
}
