// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/stylelint-module',
		'@nuxtjs/eslint-module',
		'@element-plus/nuxt',
		'nuxt-simple-robots',
		'@pinia/nuxt',
	],

	// stylelint: { /** Options */ }
	elementPlus: { /** Options */ },

	devtools: {
		enabled: true,
	},

	runtimeConfig: {
		public: {
			apiUrl: process.env.API_URL || 'https://localhost:5001',
		},
	},
});
