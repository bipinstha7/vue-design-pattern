import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
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
            path: '/event/:id',
            name: 'event-show',
            component: EventShow,
            props: true
        },
        {
            path: '/event/create',
            name: 'event-create',
            component: EventCreate
        }
    ]
})
