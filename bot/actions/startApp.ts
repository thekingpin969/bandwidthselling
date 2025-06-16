import type { Context } from "telegraf";
import Docker from "dockerode";
const docker = new Docker();

async function startApp(ctx: any) {
    try {
        const appName = ctx.match[1];
        const containers = await docker.listContainers({ all: true });

        const modules = containers.filter((cont: any) => {
            return cont.Names[0].replace('/', '').split('-')[0] === appName;
        }).map((item: any) => item.Names[0].replace('/', ''))

        const keyboard: Array<Array<{ text: string; callback_data: string }>> = [];
        keyboard.push([{ text: 'start all', callback_data: `startModules:all-${appName}` }]);
        for (let i = 0; i < modules.length; i += 2) {
            const row = [];
            if (modules[i]) row.push({ text: modules[i].split('-')[1], callback_data: `startModules:${modules[i]}` });
            if (modules[i + 1]) row.push({ text: modules[i + 1].split('-')[1], callback_data: `startModules:${modules[i + 1]}` });
            keyboard.push(row);
        }
        keyboard.push([{ text: 'Close', callback_data: 'close' }]);

        await ctx.replyWithHTML('do you wanna more specific about it?', {
            reply_markup: {
                inline_keyboard: keyboard
            }
        })

    } catch (error) {
        throw error
    }
}

export default startApp