// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/stylelint-module',
		'@nuxtjs/eslint-module',
		'@element-plus/nuxt',
		'nuxt-simple-robots',
		'nuxt-xstate',
		'@pinia/nuxt',
	],

	// stylelint: { /** Options */ },
	elementPlus: {
		themes: ['dark'],
	},

	devtools: {
		enabled: true,
	},

	ssr: false,
	runtimeConfig: {
		public: {
			apiUrl: process.env.API_URL || 'https://localhost:5001',
		},
	},

	app: {
		baseURL: '/ui/',
	},
});
