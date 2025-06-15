import Docker from 'dockerode';
import Redis from '../database/redis';

const docker = new Docker();

async function getStatus() {
    try {

        const containers = await docker.listContainers({ all: true })
        const appStatus: any = {}
        const runningStatus = await Redis.get('runningStatus') || 'Stoped'

        for (const cont of containers) {
            const container = docker.getContainer(cont?.Id || '')
            const { networks = {} } = await container.stats({ stream: false })

            const traffic = Object.keys(networks).reduce((acc: any, key: any) => {
                const network = networks[key]
                return { in: (acc.in + network?.rx_bytes), out: (acc.out + network?.tx_bytes) }
            }, { in: 0, out: 0 })

            const name: any = cont.Names[0]?.replace('/', '')
            const app: any = name?.split('-')[0] || ''
            const ip = name?.split('-')[1]?.replaceAll('_', '.')

            if (!appStatus[app]) appStatus[app] = {}
            appStatus[app][name] = {
                name,
                ip,
                traffic,
            }
        }

        return { runningStatus, appStatus }
    } catch (error) {
        console.error(`Error getting status`, error);
        return 'unknown';
    }
}
// getStatus()
export default getStatus;