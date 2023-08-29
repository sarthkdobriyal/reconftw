export default function createUrl(tenant, path) {
        return tenant ?  `http://${tenant}.${import.meta.env.VITE_API_URL}${path}` : `http://${import.meta.env.VITE_API_URL}${path}`
}