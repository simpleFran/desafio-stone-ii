import Dockerode from "dockerode";



export const dockerClient = new Dockerode({
    // host:'127.0.0.0',
    socketPath:"/var/run/docker.sock"
})