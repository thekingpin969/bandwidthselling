import type { Context } from "telegraf";
import getStatus from "../../helpers/getStatus";
import formatBytes from "../../utils/formateBytes";

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

        const totalTraffic: number | undefined = appStatus.filter((i: any) => i.name != 'tun2socks').reduce((acc: any, item: any) => {
            let t
            Object.keys(item.statuses).forEach((r) => {
                const traffic = item.statuses[r].traffic.out
                t = acc + +traffic
            })
            return t
        }, 0)

        ctx.deleteMessage(placeHolder.message_id)
        ctx.replyWithHTML(`Your Bandly Status:\n\nStatus: ${runningStatus}\nBandWidth Soled: ${formatBytes(totalTraffic)}\nUptime for: <u>3 days & 12 hours</u>\n\nDetailed Breakdown:\n----------------------------------------------\n${appStatus.map((item: any) => {
            return `<blockquote>${item.name.toUpperCase()}</blockquote>\n  • Status: running 🔄\n  • Bandwidth sold: ${formatBytes(Object.keys(item.statuses).reduce((acc: any, i: any) => { return acc + item.statuses[i].traffic.out }, 0))}\n  • Running for: <u>3 days & 12 hours</u>\n`
        }).join('')}`)

    } catch (error) {
        throw error
    }
}

export default Status