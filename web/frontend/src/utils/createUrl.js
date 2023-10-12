export default function createUrl(tenant, path) {
        return tenant ?  `https://${tenant}.${import.meta.env.VITE_API_URL}${path}` : `https://${import.meta.env.VITE_API_URL}${path}`
}