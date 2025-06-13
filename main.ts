import express from 'express'
import coldStart from './helpers/coldStart'

const app = express()
const port = 3000

await coldStart()
await import('./bot/bot')
await import('./database/redis')
const { config } = await import('dotenv')
config({ path: './.env' })

app.get('/', (req, res) => { res.sendStatus(200) })

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
