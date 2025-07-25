import type { Context } from "telegraf";
import Docker from "dockerode";
const docker = new Docker();

async function pauseModules(ctx: any) {
    try {
        const moduleName = ctx.match[1];
        const containers = await docker.listContainers({ all: true });

        if (moduleName.split('-')[0] == 'all') {
            const appModules = containers.filter((cont: any) => {
                return cont.Names[0].replace('/', '').split('-')[0] === moduleName.split('-')[1];
            });
            for (const info of appModules) {
                const container = docker.getContainer(info.Id);
                try {
                    (info.State === 'running') && await container.pause();
                    ctx.answerCbQuery(`successfully paused ${moduleName} module`)
                } catch (err) {
                    console.error(`Error removing ${info.Id}:`, err);
                    ctx.answerCbQuery(`error while pausing ${moduleName} module`)
                }
            }
        } else {
            const container: any = containers.find((item: any) => item.Names[0].replace('/', '') === moduleName)
            const moduleContainer = docker.getContainer(container.Id);
            try {
                (container.State === 'running') && await moduleContainer.pause();
                ctx.answerCbQuery(`successfully paused ${moduleName} module`)
            } catch (err) {
                console.error(`Error removing ${container.Id}:`, err);
                ctx.answerCbQuery(`error while pausing ${moduleName} module`)
            }

        }
    } catch (error) {
        throw error
    }
}

export default pauseModules