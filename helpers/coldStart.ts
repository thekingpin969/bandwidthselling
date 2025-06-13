import connectToProxies from "./connectToProxy"
import removeAllContainers from "./removeContainers"

async function coldStart() {
    try {
        console.log('spinning up apps...')
        await removeAllContainers()
        await connectToProxies()
        console.log('all apps spined up')
    } catch (error) {

    }
}

export default coldStart