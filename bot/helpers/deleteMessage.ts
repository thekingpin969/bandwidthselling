import type { Context } from "telegraf";

async function deleteMessage(ctx: Context) {
    try {
        await ctx.deleteMessage()
    } catch (error) {

    }
}

export default deleteMessage