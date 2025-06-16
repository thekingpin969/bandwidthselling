import Docker from 'dockerode';
import type { Context } from "telegraf";
import Redis from '../../database/redis';
const docker = new Docker();

async function pauseApps(ctx: any) {
    try {
        const messageId = ctx.update?.callback_query.message.message_id

        const containers = await docker.listContainers({ all: true });

        for (const info of containers) {
            const container = docker.getContainer(info.Id);
            try {
                info.State === 'running' && await container.pause();
            } catch (err) {
                console.error(`Error removing ${info.Id}:`, err);
            }
        }
        ctx.answerCbQuery(`${containers.length} apps stopped`).catch()
        await Redis.set('runningStatus', 'paused')
        ctx.deleteMessage(messageId).catch()
    } catch (error) {
        throw error
    }
}

export default pauseApps