import type { ContainerInfo } from "dockerode";
import type Dockerode from "dockerode";

export class DockerClientService {
  constructor(private dockerClient: Dockerode) {}

  public async startAllStoppedContainers(): Promise<number> {
    const containers: ContainerInfo[] = await this.dockerClient.listContainers({
      all: true,
      //VERIFICAR DOCUMENTAÇÃO DO FILTERS
      filters: { status: ["exited", "created"] },
    });

    let countContainers = 0;

    for (const containerInfo of containers) {
      try {
        const container = this.dockerClient.getContainer(containerInfo.Id);
        //como a variavel containers vai retornar um array de ContainerInfo[]
        //filtradas pelo status de exited e created, a cada item (container obtida pelo getContainer e seu Id)
        //apenas ligamos (start())
        await container.start();
        countContainers++;
      } catch (error) {
        //se houver erro
        console.error(
          `Não é possivel startar o container ${containerInfo.Id} - ${containerInfo.Names}`,
        );
      }
    }
    return countContainers;
  }

  public async stopAllStartedContainers(): Promise<number> {
    const containers: ContainerInfo[] = await this.dockerClient.listContainers({
      all: true,
      filters: { status: ["running", "created"] },
    });

    let containersCount = 0;

    for (const containerInfo of containers) {
      try {
        await this.dockerClient.getContainer(containerInfo.Id).stop();

        containersCount++;
      } catch (error) {
        console.error(
          `Não foi possível pausar o container ${containerInfo.Id}`,
        );
      }
    }

    return containersCount;
  }
}
