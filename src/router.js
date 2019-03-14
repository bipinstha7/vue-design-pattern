import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
import NotFound from '@/views/NotFound.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'event-list',
            component: EventList,
            props: true
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
            props: true,
            beforeEnter(to, from, next) {
                store
                    .dispatch('event/fetchEvent', to.params.id)
                    .then(event => {
                        /* This event will be sent as a prop because of props: true */
                        to.params.event = event
                        next()
                    })
                    .catch(err => {
                        if (err.response && err.response.status == 404) {
                            return next({ name: '404', params: { resource: 'event' } })
                        }

                        next({ name: 'network-issue' })
                    })
            }
        },
        {
            path: '/event/create',
            name: 'event-create',
            component: EventCreate
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            props: true
        },
        {
            path: '/network-issue',
            name: 'network-issue',
            component: NetworkIssue
        },
        {
            path: '*',
            redirect: { name: '404', params: { resource: 'page' } }
        }
    ]
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach((to, from, next) => {
    NProgress.done()
})

export default router
