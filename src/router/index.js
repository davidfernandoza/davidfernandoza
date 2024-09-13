import authMiddleware from '@/app/middlewares/AuthMiddleware'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/app/views/public/Home.vue')
		},
		{
			path: '/admin',
			name: 'admin',
			// beforeEnter: authMiddleware,
			component: () => import('@/app/views/admin/dashboard/Index.vue')
		},
		{
			path: '/admin/skills',
			name: 'admin-skills',
			// beforeEnter: authMiddleware,
			component: () => import('@/app/views/admin/skills/Index.vue')
		},
		{
			path: '/admin/projects',
			name: 'admin-projects',
			// beforeEnter: authMiddleware,
			component: () => import('@/app/views/admin/projects/Index.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			component: () => import('@/app/views/errors/Error404.vue')
		}
	]
})

export default router
