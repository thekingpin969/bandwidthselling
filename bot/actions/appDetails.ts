import type { Context } from "telegraf";
import Docker from "dockerode";
import formatBytes from "../../utils/formateBytes";
import formatDuration from "../../utils/formateDuration";
const docker = new Docker();

async function appDetails(ctx: any) {
    try {
        const appName = ctx.match[1];

        const containers = await docker.listContainers({ all: true });

        const selectedContainers = containers.filter((cont: any) => {
            return cont.Names[0].replace('/', '').split('-')[0] === appName;
        });

        if (!selectedContainers.length) {
            return await ctx.replyWithHTML(`<b>No container found for:</b> ${appName}`);
        }

        const moduleStatuses = []

        for (const item of selectedContainers) {
            const container = docker.getContainer(item?.Id || '');
            const inspectData = await container.inspect();
            const Status = await container.stats({ stream: false })
            const name = inspectData.Name.replace('/', '')

            const status = inspectData.State.Status
            const created = inspectData.Created
            const started = new Date(inspectData.State.StartedAt?.slice(0, 23) + 'Z').getTime()
            const traffic = Object.keys(Status.networks || {}).reduce((acc: any, key: any) => {
                const network = Status.networks[key]
                return { in: (acc.in + network?.rx_bytes), out: (acc.out + network?.tx_bytes) }
            }, { in: 0, out: 0 })

            moduleStatuses.push({ name, status, created, started, traffic })
        }

        const totalRunning = moduleStatuses.reduce((acc: any, item: any) => {
            if (item.status == 'running') return acc + 1
            return acc
        }, 0)
        const notRunning = moduleStatuses.length - totalRunning
        const totalTraffic = moduleStatuses.reduce((acc: any, item: any) => {
            return { in: acc.in + item.traffic.in, out: acc.out + item.traffic.out }
        }, { in: 0, out: 0 })

        return await ctx.replyWithHTML(`<blockquote>${appName}</blockquote>\nRunning Status: <i>${totalRunning} running & ${notRunning} stoped/paused</i>\nTotal bandwidth soled: ${formatBytes(totalTraffic.out)} kb\n\n<b>Modules Status</b>:\n${moduleStatuses.map((item: any) => {
            return `<blockquote>${item.name.toUpperCase()}</blockquote>\n  • Status: ${item.status}\n  • Bandwidth sold: ${formatBytes(item.traffic.out)} kb\n  • Running for: <u>${formatDuration(Math.abs(item.started - new Date().getTime()))}</u>\n  • Running logs: <a href="https://google.com/${item.name}">open logs</a>`
        }).join('')}`, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Stop app', callback_data: `stopApp:${appName}` },
                        { text: 'Pause app', callback_data: `pauseApp:${appName}` },
                    ],
                    [
                        { text: 'Start app', callback_data: `startApp:${appName}` },
                    ],
                    [
                        { text: 'Close', callback_data: 'close' },
                    ],
                ]
            }
        })

    } catch (error) {
        console.error(error);
        await ctx.reply("❌ Error while fetching container details.");
    }
}

export default appDetails;
