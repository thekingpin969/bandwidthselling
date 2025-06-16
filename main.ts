import { Hono } from 'hono'
import coldStart from './helpers/coldStart'
import { serve } from 'bun'
import getLLogs from './routes/getLogs'
import { cors } from 'hono/cors'
import getModules from './routes/getModules'

await coldStart()
await import('./bot/bot')
await import('./database/redis')
const { config } = await import('dotenv')
config({ path: './.env' })

const app = new Hono()

app.use('*', cors({ origin: '*' }))

app.get('/', (c) => c.text('OK'))
app.get('/getLogs/:name', getLLogs)
app.get('/getModules', getModules)


serve({
    fetch: app.fetch,
    port: 3000,
})
console.log('server running on port 3000')
