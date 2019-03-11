import axios from 'axios'

const apiClient = axios.create({
    // baseURL: 'https://my-json-server.typicode.com/bipinstha7/vue-design-pattern',
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage, page) {
        console.log('page', page, 'limit', perPage)
        return apiClient.get(`/events?_page=${page}&_limit=${perPage}`)
    },
    getEvent(id) {
        return apiClient.get(`/events/${id}`)
    },
    postEvent(event) {
        return apiClient.post('/events', event)
    }
}
