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
import appDetails from './keyboard/appDetails';
import appDetailsAction from './actions/appDetails';
import stopApp from './actions/stopApp';
import startApp from './actions/startApp';
import pauseApp from './actions/pauseApp';
import restartApp from './actions/restartApp';
import stopModules from './actions/stopModules';
import pauseModules from './actions/pauseModules';
import startModules from './actions/startModules';
import restartModules from './actions/restartModules';
import start from './commands/start';

const bot = new Telegraf(process.env.BOT_TOKEN || '')

bot.start(start);

bot.use((ctx, next) => {
    ctx.deleteMessage()
    next()
})

bot.hears('Status', Status)
bot.hears('Restart', restart)
bot.hears('Stop/Start', stopOrStart)
bot.hears('Pause/Resume', pauseResume)
bot.hears('App details', appDetails)

bot.action('stopeApps', stopApps)
bot.action('startApps', startApps)
bot.action('pauseApps', pauseApps)
bot.action('hard_restart', hardRestart)
bot.action('soft_restart', softRestart)
bot.action(/appDetails:(.+)/, appDetailsAction)
bot.action(/stopApp:(.+)/, stopApp)
bot.action(/stopModules:(.+)/, stopModules)
bot.action(/startApp:(.+)/, startApp)
bot.action(/startModules:(.+)/, startModules)
bot.action(/pauseApp:(.+)/, pauseApp)
bot.action(/pauseModules:(.+)/, pauseModules)
bot.action(/restartApp:(.+)/, restartApp)
bot.action(/restartModules:(.+)/, restartModules)
bot.action('close', (ctx) => ctx.deleteMessage())
bot.action('cancel_restart', (ctx) => ctx.editMessageText('restart cancelled'))

bot.launch()
console.log('tg bot running...')

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));