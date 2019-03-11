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
        }
    },
    actions: {
        /* update to store only after successful data store */
        createEvent({ commit }, event) {
            return EventService.postEvent(event).then(() => {
                commit('ADD_EVENT', event)
            })
        }
    }
})
