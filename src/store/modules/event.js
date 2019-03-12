import EventService from '@/services/EventService.js'

export const namespaced = true

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
    createEvent({ commit, dispatch }, event) {
        return EventService.postEvent(event)
            .then(() => {
                commit('ADD_EVENT', event)

                const notification = {
                    type: 'success',
                    message: `Your event has been created!`
                }

                /* The way we dispatch the action of another namespaced module */
                dispatch('notification/add', notification, {root: true})
            })
            .catch(err => {
                const notification = {
                    type: 'error',
                    message: `There was a problem creating your event: ${err.message}`
                }

                /* The way we dispatch the action of another namespaced module */
                dispatch('notification/add', notification, {root: true})

                /* throw err so that the event create component can act upon the error, o.e stay on the same page without clearing the form */
                throw err
            })
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then(response => {
                commit('SET_EVENTS', response.data)
            })
            .catch(err => {
                const notification = {
                    type: 'error',
                    message: `There was a problem fetching events: ${err.message}`
                }

                /* The way we dispatch the action of another namespaced module */
                dispatch('notification/add', notification, {root: true})
            })
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
            .catch(err => {
                const notification = {
                    type: 'error',
                    message: `There was a problem fetching event: ${err.message}`
                }

                /* The way we dispatch the action of another namespaced module */
                dispatch('notification/add', notification, {root: true})
            })
    }
}

export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    }
}