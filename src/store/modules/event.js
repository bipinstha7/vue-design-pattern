import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
    events: [],
    event: {},
    perPage: 2
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
    /* update to store only after successful database store */
    createEvent({ commit, dispatch }, event) {
        return EventService.postEvent(event)
            .then(() => {
                commit('ADD_EVENT', event)

                const notification = {
                    type: 'success',
                    message: `Your event has been created!`
                }

                /* The way we dispatch the action of another namespaced module */
                dispatch('notification/add', notification, { root: true })
            })
            .catch(err => {
                const notification = {
                    type: 'error',
                    message: `There was a problem creating your event: ${err.message}`
                }

                /* The way we dispatch the action of another namespaced module */
                dispatch('notification/add', notification, { root: true })

                /* throw err so that the event create component can act upon the error, o.e stay on the same page without clearing the form */
                throw err
            })
    },
    fetchEvents({ commit, dispatch, state }, { page }) {
        return EventService.getEvents(state.perPage, page)
            .then(response => {
                commit('SET_EVENTS', response.data)
            })
            .catch(err => {
                const notification = {
                    type: 'error',
                    message: `There was a problem fetching events: ${err.message}`
                }

                /* The way we dispatch the action of another namespaced module */
                dispatch('notification/add', notification, { root: true })
            })
    },
    fetchEvent({ commit, getters, state }, id) {
        if (id == state.event.id) return state.event

        let event = getters.getEventById(id)

        if (event) {
            commit('SET_EVENT', event)

            /* return event so that it will be accessible in router promise */
            return event
        }

        return EventService.getEvent(id).then(response => {
            commit('SET_EVENT', response.data)

            /* return event so that it will be accessible in router */
            return response.data
        })
    }
}

export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    }
}
