import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
	base: '',
	server: {
		host: true,
		port: 5002,
		watch: {
			usePolling: true
		}
	},
	plugins: [vue(), VueDevTools()],
	build: { chunkSizeWarningLimit: 5000 },
	resolve: {
		alias: {
			vue: 'vue/dist/vue.esm-bundler.js',
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'~': fileURLToPath(new URL('node_modules', import.meta.url))
		}
	}
})
