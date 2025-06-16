import Docker from 'dockerode';
import type { Context } from 'telegraf';
import Redis from '../../database/redis';
const docker = new Docker();

async function startApps(ctx: any) {
    try {
        const messageId = ctx.update?.callback_query.message.message_id

        const containers = await docker.listContainers({ all: true });

        const gunArray = []
        for (const info of containers) {
            const container = docker.getContainer(info.Id);
            info.State === 'exited' && gunArray.push(container.start());
            info.State === 'paused' && gunArray.push(container.unpause())
        }
        const allSettled = await Promise.allSettled(gunArray);
        const allFulfilled = allSettled.every(result => result.status === 'fulfilled');
        if (allFulfilled) {
            try {
                ctx.answerCbQuery(`${containers.length} apps spins up and starts running`).catch()
                await Redis.set('runningStatus', 'Running')
                ctx.deleteMessage(messageId).catch()
            } catch (error) {

            }
        } else {
            ctx.answerCbQuery(`trying again`).catch()
            await startApps(ctx)
        }
    } catch (error) {
        throw error
    }
}

export default startApps