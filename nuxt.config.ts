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
		importStyle: 'scss',
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

		// head
		head: {
			title: 'AdvancedForms',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					hid: 'description',
					name: 'description',
					content: 'Serverless forms with templates and custom replies.',
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},

	// css
	css: ['~/assets/scss/index.scss'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/scss/element/index.scss" as element;',
				},
			},
		},
	},
});
