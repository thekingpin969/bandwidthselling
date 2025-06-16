import Docker from 'dockerode';
import type { Context } from 'telegraf';
import Redis from '../../database/redis';
const docker = new Docker();

async function stopApps(ctx: any) {
    try {
        const messageId = ctx.update?.callback_query.message.message_id

        const containers = await docker.listContainers({ all: true });

        for (const info of containers) {
            const container = docker.getContainer(info.Id);
            try {
                info.State === 'running' && await container.stop();
            } catch (err) {
                console.error(`Error removing ${info.Id}:`, err);
            }
        }
        try {
            ctx.answerCbQuery(`${containers.length} apps stopped`).catch()
            await Redis.set('runningStatus', 'Stoped')
            ctx.deleteMessage(messageId).catch()
        } catch (error) { }
    } catch (error) {
        throw error
    }
}

export default stopApps