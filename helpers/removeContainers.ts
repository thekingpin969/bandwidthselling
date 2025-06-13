import Docker from 'dockerode';
const docker = new Docker();

async function removeAllContainers() {
    const containers = await docker.listContainers({ all: true });

    for (const info of containers) {
        const container = docker.getContainer(info.Id);
        try {
            (info.State === 'running' || info.State === 'paused') && await container.stop();
            await container.remove();
        } catch (err) {
            console.error(`Error removing ${info.Id}:`, err);
        }
    }
}

// removeAllContainers();

export default removeAllContainers;
// This script removes all Docker containers, stopping them if they are running.