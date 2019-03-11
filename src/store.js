import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: { id: '111aaa', name: 'Jamie Lannister' },
        categories: [
            'sustainability',
            'nature',
            'animal welfare',
            'housing',
            'education',
            'food',
            'community'
        ],
        events: []
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        },
        SET_EVENTS(state, events) {
            state.events = events
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
        }
    },
    getters: {
        getEventById: state => id => {
            return state.events.find(event => event.id === id)
        }
    }
})
