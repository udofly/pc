import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import PcLayout from '@/layouts/PcLayout.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { get } from 'lodash-es';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: PcLayout,
        children: [
            { path: '', component: () => import('@/views/pc/Welcome.vue'), name: 'pc.home', meta: { title: 'udofly' } },
            { path: 'main', component: () => import('@/views/main/Main.vue'), name: 'pc.main', meta: { title: '首页' } },
            { path: 'login', component: () => import('@/views/pc/Login.vue'), name: 'pc.login', meta: { title: 'udofly' } },
            { path: 'info', component: () => import('@/views/pc/Info.vue'), name: 'pc.info', meta: { auth: true, title: 'udofly' } },
            { path: 'chat/:tid?', component: () => import('@/views/pc/Chat.vue'), name: 'pc.chat', meta: { auth: true, title: 'udofly' } },
            { path: 'create-image', component: () => import('@/views/pc/CreateImage.vue'), name: 'create.image', meta: { auth: false, title: 'udofly' } }
        ]
    },
    {
        path: '/',
        component: SiteLayout,
        children: [
            {
                path: '', component: () => import('@/views/main/Main.vue'), name: 'home', meta: {
                    title: '官网',
                    goMobile: true
                }
            }
        ]
    }
]

const router: Router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.beforeEach((to, from, next) => {
    let title = get(to, 'meta.title');
    if (title) {
        document.title = title;
    }
    next();
});
export default router
