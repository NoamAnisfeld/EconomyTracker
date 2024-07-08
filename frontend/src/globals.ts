export const backendUrl = String(import.meta.env.VITE_BACKEND_URL || location.origin)
export const apiEndpoint = `${backendUrl}/api/`;
export const defaultImageUrl = `${backendUrl}/media/flowered%20tree.jpg`;