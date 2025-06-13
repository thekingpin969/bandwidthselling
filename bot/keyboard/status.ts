import type { Context } from "telegraf";
import getStatus from "../../helpers/getStatus";

async function Status(ctx: Context) {
    try {
        const placeHolder = await ctx.reply('getting status, plz wait...')
        const status: any = await getStatus()

        let runningStatus
        switch (status.runningStatus) {
            case 'Stopped':
                runningStatus = 'Stopped ⏹️'
                break
            case 'Running':
                runningStatus = 'Running 🔄'
                break
            case 'paused':
                runningStatus = 'Paused ⏸️'
                break
            default:
                runningStatus = 'Stopped ⏹️'
                break
        }

        const appStatus = Object.keys(status.appStatus).map((item: any) => {
            const itemStatus = status.appStatus[item]
            return { name: item, statuses: itemStatus }
        })

        ctx.deleteMessage(placeHolder.message_id)
        ctx.replyWithHTML(`Your Bandly Status:\n\nStatus: ${runningStatus}\nBandWidth Soled: 12.45 gb\nUptime for: <u>3 days & 12 hours</u>\n\nDetailed Breakdown:\n----------------------------------------------\n${appStatus.map((item: any) => {
            return `<blockquote>${item.name.toUpperCase()}</blockquote>\n  • Status: running 🔄\n  • Bandwidth sold: 736.32 mb\n  • Running for: <u>3 days & 12 hours</u>\n`
        }).join('')}`)

    } catch (error) {
        throw error
    }
}

export default Status