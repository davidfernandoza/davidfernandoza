import { createRouter, createWebHistory } from 'vue-router'
// import { authMiddleware } from '@/services/AuthServices'

// Views
import Home from '@/views/public/Home.vue'
import Login from '@/views/auth/Login.vue'
import Users from '@/views/admin/users/Index.vue'
import Admin from '@/views/admin/Index.vue'
import Skills from '@/views/admin/skills/Index.vue'
import Error404 from '@/views/errors/Error404.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/login',
			name: 'login',
			// beforeEnter: authMiddleware,
			component: Login
		},
		{
			path: '/admin/users',
			name: 'admin-users',
			// beforeEnter: authMiddleware,
			component: Users
		},
		{
			path: '/admin',
			name: 'admin',
			// beforeEnter: authMiddleware,
			component: Admin
		},
		{
			path: '/admin/skills',
			name: 'admin-skills',
			// beforeEnter: authMiddleware,
			component: Skills
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			component: Error404
		}
	]
})

export default router
