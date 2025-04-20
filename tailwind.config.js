// tailwind.config.js
module.exports = {
	content: [
		"./src/**/*.html",
		"./src/**/*.js",
		// osv.
	],
	theme: {
		extend: {
			/* ... */
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		// andre plugins
	],
};
