import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'event-list',
            component: EventList
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () =>
        //     import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
        {
            path: '/event',
            name: 'event-show',
            component: EventShow
        },
        {
            path: '/event/creaet',
            name: 'event-create',
            component: EventCreate
        }
    ]
})
