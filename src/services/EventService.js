import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://raw.githubusercontent.com/bipinstha7/vue-design-pattern/master',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents() {
        return apiClient.get('/db.json')
    }
}
