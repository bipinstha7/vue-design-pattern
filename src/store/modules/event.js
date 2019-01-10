import EventService from '@/services/EventService.js'

export const state = {
    events: [],
    event: {}
}

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENTS(state, events) {
        state.events = events
    },
    SET_EVENT(state, event) {
        state.event = event
    }
}

export const actions = {
    /* update to store only after successful data store */
    createEvent({ commit }, event) {
        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event)
        })
    },
    fetchEvents({ commit }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then(response => {
                commit('SET_EVENTS', response.data)
            })
            .catch(err => console.log('err', err))
    },
    fetchEvent({ commit, getters }, id) {
        let event = getters.getEventById(id)

        if (event) {
            return commit('SET_EVENT', event)
        }

        EventService.getEvent(id)
            .then(response => {
                commit('SET_EVENT', response.data)
            })
            .catch(err => console.log('err', err))
    }
}

export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    }
}