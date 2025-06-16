import getApps from "../helpers/getApps";


async function getModules(c: any) {
    try {
        const modules = getApps()
        return c.json(modules)
    } catch (error: any) {
        return c.text(error.message)

    }
}

export default getModules