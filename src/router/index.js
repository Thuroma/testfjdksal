import { createRouter, createWebHashHistory } from 'vue-router'

import SearchParameters from '@/components/SearchParameters'
import AboutSite from '@/components/AboutSite'
import SearchResults from '@/components/SearchResults'



export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'SearchParameters',
            component: SearchParameters
        },
        {
            path: '/about',
            name: 'AboutSite',
            component: AboutSite
        },
        {
            path: '/search/:latitude/:longitude/:categories_list*',
            name: 'SearchResults',
            component: SearchResults
        }
    ]
})