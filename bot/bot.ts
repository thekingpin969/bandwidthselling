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
import deleteMessage from './helpers/deleteMessage';

const bot = new Telegraf(process.env.BOT_TOKEN || '')

try {
    bot.start(start);

    bot.use(async (ctx: any, next) => {
        try {
            if (!ctx.update.callback_query) deleteMessage(ctx)
            await next()
        } catch (error) { await next() }
    })

    bot.hears('Status', Status)
    bot.hears('Restart', restart)
    bot.hears('App details', appDetails)
    bot.hears('Stop/Start', stopOrStart)
    bot.hears('Pause/Resume', pauseResume)

    bot.action('stopApps', stopApps)
    bot.action('pauseApps', pauseApps)
    bot.action('startApps', startApps)
    bot.action(/stopApp:(.+)/, stopApp)
    bot.action(/startApp:(.+)/, startApp)
    bot.action(/pauseApp:(.+)/, pauseApp)
    bot.action('hard_restart', hardRestart)
    bot.action('soft_restart', softRestart)
    bot.action(/restartApp:(.+)/, restartApp)
    bot.action(/stopModules:(.+)/, stopModules)
    bot.action(/pauseModules:(.+)/, pauseModules)
    bot.action(/startModules:(.+)/, startModules)
    bot.action(/appDetails:(.+)/, appDetailsAction)
    bot.action(/restartModules:(.+)/, restartModules)
    bot.action('close', async (ctx) => await ctx.deleteMessage())
    bot.action('cancel_restart', async (ctx) => await ctx.editMessageText('restart cancelled'))

    bot.launch()

    console.log('tg bot running...')
} catch (error) {
    console.error(error)
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));