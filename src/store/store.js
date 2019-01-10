import Vue from 'vue'
import Vuex from 'vuex'

import EventService from '@/services/EventService.js'
import * as user from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },
    state: {
        categories: [
            'sustainability',
            'nature',
            'animal welfare',
            'housing',
            'education',
            'food',
            'community'
        ],
        events: [],
        event: {}
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        },
        SET_EVENTS(state, events) {
            state.events = events
        },
        SET_EVENT(state, event) {
            state.event = event
        }
    },
    actions: {
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
    },
    getters: {
        getEventById: state => id => {
            return state.events.find(event => event.id === id)
        }
    }
})
