import Docker from 'dockerode'
const docker = new Docker()

async function getApps() {
    try {
        const containers = await docker.listContainers({ all: true });

        const modules = containers.map((cont) => {
            return cont.Names[0]?.replace('/', '')
        })

        return modules
    } catch (error) {
        throw error
    }
}

export default getApps