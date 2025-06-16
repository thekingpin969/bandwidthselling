import type { Context } from "telegraf";
import Docker from "dockerode";
const docker = new Docker();

async function restartModules(ctx: any) {
    try {
        const moduleName = ctx.match[1];
        console.log(moduleName)
        const containers = await docker.listContainers({ all: true });

        if (moduleName.split('-')[0] == 'all') {
            const appModules = containers.filter((cont: any) => {
                return cont.Names[0].replace('/', '').split('-')[0] === moduleName.split('-')[1];
            });
            for (const info of appModules) {
                const container = docker.getContainer(info.Id);
                try {
                    await container.restart();
                    ctx.answerCbQuery(`successfully stopped ${moduleName} module`)
                } catch (err) {
                    console.error(`Error removing ${info.Id}:`, err);
                    ctx.answerCbQuery(`error while stopping ${moduleName} module`)
                }
            }
        } else {
            const container: any = containers.find((item: any) => item.Names[0].replace('/', '') === moduleName)
            const moduleContainer = docker.getContainer(container.Id);
            try {
                await moduleContainer.restart();
                ctx.answerCbQuery(`successfully stopped ${moduleName} module`)
            } catch (err) {
                console.error(`Error removing ${container.Id}:`, err);
                ctx.answerCbQuery(`error while stopping ${moduleName} module`)
            }

        }
    } catch (error) {
        throw error
    }
}

export default restartModules