import type { Context } from "telegraf";

async function start(ctx: Context) {
    try {
        ctx.reply('Welcome! I am you bandwidth sharing manager bot, bandly! 🥰\nhow can i assist you?', {
            reply_markup: {
                keyboard: [
                    ['Status', 'App details'],
                    ['Pause/Resume', 'Restart'],
                    ['Stop/Start'],
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export default start