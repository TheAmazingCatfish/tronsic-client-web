import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        alias: ['/home', '/index'],
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/sign-up',
        alias: '/register',
        name: 'signUp',
        component: () => import('../views/SignUp.vue')
    },
    {
        path: '/video/:videoId',
        name: 'videoWatch',
        component: () => import('../views/VideoWatch.vue'),
        props: true
    },
    {
        path: '*',
        name: 'notFound',
        component: () => import('../views/NotFound.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
