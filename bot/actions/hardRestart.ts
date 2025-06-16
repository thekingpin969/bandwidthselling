import type { Context } from "telegraf";
import removeAllContainers from "../../helpers/removeContainers";
import connectToProxies from "../../helpers/connectToProxy";

async function hardRestart(ctx: Context) {
    try {
        editedMessage(ctx, 'hard restart on process...')
        await removeAllContainers()
        editedMessage(ctx, 'spinning up modules...')
        await connectToProxies()
        editedMessage(ctx, 'Restart completed ✅')
    } catch (error) {
        throw error
    }
}

export default hardRestart

async function editedMessage(ctx: Context, msg: any) {
    try {
        return await ctx.editMessageText(msg).catch()

    } catch (error) {

    }
}