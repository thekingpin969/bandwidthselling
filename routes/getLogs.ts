import { streamText } from "hono/streaming"
import Docker from 'dockerode'
const docker = new Docker()

async function getLLogs(c: any) {
    try {
        const appName = c.req.param('name')
        const container = docker.getContainer(appName);

        const logs = await container.logs({
            follow: false,
            stdout: true,
            stderr: true,
            timestamps: false,
            since: 0,
        });
        return c.text(logs.toString('utf8'))
    } catch (error: any) {
        return c.text(error.message)
    }
}

export default getLLogs