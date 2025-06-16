import type { Context } from "telegraf";
import Docker from "dockerode";
const docker = new Docker();

async function startModules(ctx: any) {
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
                    info.State === 'exited' && container.start()
                    info.State === 'paused' && container.unpause()
                    ctx.answerCbQuery(`successfully started ${moduleName} module`)
                } catch (err) {
                    console.error(`Error removing ${info.Id}:`, err);
                    ctx.answerCbQuery(`error while starting ${moduleName} module`)
                }
            }
        } else {
            const container: any = containers.find((item: any) => item.Names[0].replace('/', '') === moduleName)
            const moduleContainer = docker.getContainer(container.Id);
            try {
                container.State === 'exited' && moduleContainer.start()
                container.State === 'paused' && moduleContainer.unpause()
                ctx.answerCbQuery(`successfully started ${moduleName} module`)
            } catch (err) {
                console.error(`Error removing ${container.Id}:`, err);
                ctx.answerCbQuery(`error while starting ${moduleName} module`)
            }

        }
    } catch (error) {
        throw error
    }
}

export default startModules