// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/stylelint-module',
		'@nuxtjs/eslint-module',
		'@element-plus/nuxt',
		'nuxt-simple-robots'
	],

	// stylelint: { /** Options */ }
	elementPlus: { /** Options */ },

	devtools: true
})
