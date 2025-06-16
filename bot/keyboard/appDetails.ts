import type { Context } from "telegraf";
import getApps from "../../helpers/getApps";

async function appDetails(ctx: Context) {
    try {
        const modules = await getApps()

        const apps: any[] = Array.from(new Set(modules.map((mod: any) => mod.split('-')[0] || '')))

        // Group apps into pairs
        const keyboard: Array<Array<{ text: string; callback_data: string }>> = [];
        for (let i = 0; i < apps.length; i += 2) {
            const row = [];
            if (apps[i]) row.push({ text: apps[i], callback_data: `appDetails:${apps[i]}` });
            if (apps[i + 1]) row.push({ text: apps[i + 1], callback_data: `appDetails:${apps[i + 1]}` });
            keyboard.push(row);
        }
        keyboard.push([{ text: 'Close', callback_data: 'close' }]);

        await ctx.replyWithHTML(
            `<blockquote>app details</blockquote>\ntotal ${apps.length} apps\nwith ${modules.length} modules\nrunning on 20 proxies\n\nclick on apps to get detailed view of each app and modules.`,
            {
                reply_markup: {
                    inline_keyboard: keyboard
                }
            }
        );

    } catch (error) {
        throw error
    }
}

export default appDetails