import Docker from 'dockerode';

async function RollUpAppContainers(proxy: string | null = null, id = 'kingpin') {
    try {
        if (!proxy) return console.error('Proxy is required to create RollUpAppContainers');

        const docker = new Docker();

        const proxyContainer = await docker.createContainer({
            name: `tun2socks-${id}`, Hostname: `tun2socks-${id}`, Image: 'xjasonlyu/tun2socks',
            Env: ['LOGLEVEL=info', `PROXY=${proxy}`, 'EXTRA_COMMANDS=ip rule add iif lo ipproto udp dport 53 lookup main;'],
            HostConfig: {
                CapAdd: ['NET_ADMIN'], Privileged: true, NetworkMode: 'bridge',
                Dns: ['1.1.1.1', '8.8.8.8', '1.0.0.1', '8.8.4.4'],
                Binds: ['/dev/net/tun:/dev/net/tun'],
                RestartPolicy: { Name: 'always' }
            },
            Labels: { group: 'kingpin-stack' }
        });

        await proxyContainer.start();

        const repocket = await docker.createContainer({
            name: `repocket-${id}`, Image: 'repocket/repocket:latest',
            Env: ['RP_EMAIL=thunderfooot2255@gmail.com', 'RP_API_KEY=25db0798-ec39-4623-a09e-623ab1344bd1'],
            HostConfig: { NetworkMode: `container:tun2socks-${id}`, RestartPolicy: { Name: 'always' } },
            Labels: { group: `kingpin-stack_${id}` }
        });

        const honeygain = await docker.createContainer({
            name: `honeygain-${id}`, Image: 'honeygain/honeygain:latest',
            Env: ["HONEYGAIN_DUMMY="],
            Cmd: [
                "-tou-accept",
                "-email", "thunderfooot2255@gmail.com",
                "-pass", "cch9szwd26",
                "-device", `kingpin_honeygain_${id}`
            ],
            HostConfig: { NetworkMode: `container:tun2socks-${id}`, RestartPolicy: { Name: 'always' } },
            Labels: { group: `kingpin-stack_${id}` }
        })

        const iproyal = await docker.createContainer({
            name: `iproyalpawns-${id}`, Image: 'iproyal/pawns-cli:latest',
            Env: ["IPROYALPAWNS_DUMMY=''"],
            Cmd: [
                "-accept-tos",
                "-email", "thunderfooot2255@gmail.com",
                "-password", "cch9szwd26",
                "-device-name", `kingpin_${id}`,
                "-device-id", `id_kingpin_${id}`
            ],
            HostConfig: { NetworkMode: `container:tun2socks-${id}`, RestartPolicy: { Name: 'always' } },
            Labels: { group: `kingpin-stack_${id}` }
        });

        await repocket.start()
        await honeygain.start()
        await iproyal.start()
    } catch (error) {
        console.error(`Error rolling up app containers: ${error}`);
        throw error;
    }
}

export default RollUpAppContainers;