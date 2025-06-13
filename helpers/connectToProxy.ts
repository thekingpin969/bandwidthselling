import { readFileSync } from "node:fs";
import RollUpAppContainers from "./rollUpAppContainers";

async function connectToProxies() {
    try {

        const proxies = await readFileSync('./proxies.txt', 'utf-8')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line !== '');

        for (const proxy of proxies) {
            const [auth, address] = proxy.split('//')[1]?.split('@') || [];
            if (!address || !auth) {
                console.error(`Invalid proxy format: ${proxy}`);
                continue;
            }
            const [proxyHost, proxyPort] = address.split(':');
            if (!proxyHost || !proxyPort) {
                console.error(`Invalid proxy format: ${proxy}`);
                continue;
            }

            const [username = '', password = ''] = auth.split(':');
            const proxyUrl = `http://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${proxyHost}:${proxyPort}`;

            const id = proxyHost.split('.').join('_')
            await RollUpAppContainers(proxyUrl, id)
        }
    } catch (error) {
        throw error
    }
}

// connectToProxies();
export default connectToProxies;