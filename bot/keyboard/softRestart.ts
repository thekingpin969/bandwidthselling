import type { Context } from "telegraf";
import removeAllContainers from "../../helpers/removeContainers";
import connectToProxies from "../../helpers/connectToProxy";

async function softRestart(ctx: Context) {
    try {
        editedMessage(ctx, 'soft restart on process...')
        await removeAllContainers()
        editedMessage(ctx, 'spinning up modules...')
        await connectToProxies()
        editedMessage(ctx, 'Restart completed ✅')
    } catch (error) {
        throw error
    }
}

export default softRestart

async function editedMessage(ctx: Context, msg: any) {
    try {
        return await ctx.editMessageText(msg).catch()

    } catch (error) {

    }
}