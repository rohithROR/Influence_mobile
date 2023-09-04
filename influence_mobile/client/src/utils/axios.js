import http from "./http-client";


export const getOffers = async () => {
    const response = await http.get('/offers')
    return response.data
}