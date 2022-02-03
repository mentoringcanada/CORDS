module.exports = {
	content: [
		"src/pages/**/*.{js,ts,jsx,tsx}",
		"src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		colors: {
			primary: "#3A76F4",
			outline: "#555555",
			text: "#333333",
			white: "#FFFFFF",
			error: "#F44336",
		},
		fontFamily: {
			base: ["Open Sans", "sans-serif"],
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
