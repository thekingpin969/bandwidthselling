import type { Context } from "telegraf";
import Redis from "../../database/redis";

async function restart(ctx: Context) {
    try {

        await ctx.replyWithHTML(
            `Are you sure with your action, if yes please choose a option\n\n<i><b>hard restart</b>: erase all previous data and restart\n<b>soft restart</b>: keep existing data and restart on top of that</i>`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Hard Restart', callback_data: 'hard_restart' },
                            { text: 'Soft Restart', callback_data: 'soft_restart' }
                        ],
                        [
                            { text: 'Cancel', callback_data: 'cancel_restart' }
                        ],
                    ]
                }
            }
        );
    } catch (error) {
        throw error;
    }
}

export default restart;