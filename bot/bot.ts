import { Telegraf } from 'telegraf';
import Status from './keyboard/status';
import stopOrStart from './keyboard/stopOrStart';
import startApps from './actions/startApps';
import stopApps from './actions/stopApps';
import pauseApps from './actions/pauseApps';
import pauseResume from './keyboard/pauseResume';
import restart from './keyboard/restart';
import hardRestart from './actions/hardRestart';
import softRestart from './keyboard/softRestart';

const bot = new Telegraf(process.env.BOT_TOKEN || '')

bot.start((ctx) => {
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
});

bot.hears('Status', Status)
bot.hears('Restart', restart)
bot.hears('Stop/Start', stopOrStart)
bot.hears('Pause/Resume', pauseResume)

bot.action('stopeApps', stopApps)
bot.action('startApps', startApps)
bot.action('pauseApps', pauseApps)
bot.action('hard_restart', hardRestart)
bot.action('soft_restart', softRestart)
bot.action('cancel_restart', (ctx) => ctx.editMessageText('restart cancelled'))

bot.launch()
console.log('tg bot running...')

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));