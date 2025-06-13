import type { Context } from "telegraf";
import Redis from "../../database/redis";

async function stopOrStart(ctx: Context) {
    try {
        const currentStatus = await Redis.get('runningStatus') || 'Stoped'

        await ctx.replyWithHTML(
            `Current status: <u>${currentStatus}</u>\n\n<i>would you like to proceed, please confirm your action.</i>`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: currentStatus === 'Running' ? 'Stop Service' : 'Start Service', callback_data: currentStatus === 'Running' ? 'stopeApps' : 'startApps' }
                        ]
                    ]
                }
            }
        );
    } catch (error) {
        throw error;
    }
}

export default stopOrStart;