import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
    // baseURL: 'https://my-json-server.typicode.com/bipinstha7/vue-design-pattern',
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    NProgress.start()
    return config
})

apiClient.interceptors.response.use(response => {
    NProgress.done()
    return response
})

export default {
    getEvents(perPage, page) {
        return apiClient.get(`/events?_page=${page}&_limit=${perPage}`)
    },
    getEvent(id) {
        return apiClient.get(`/events/${id}`)
    },
    postEvent(event) {
        return apiClient.post('/events', event)
    }
}
