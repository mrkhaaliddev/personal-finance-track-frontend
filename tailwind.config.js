/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // colors: {
    //   "custom-blue": "#157AFF", // Custom color name: custom-blue
    //   "custom-dark": "#121B28", // Custom color name: custom-dark
    //   "custom-light": "white", // Custom color name: custom-light
    //   "custom-gray": "#F5F5F5", // Custom color name: custom-gray
    //   "custom-red": "#FF0000", // Custom color name: custom-red
    // },
    screens: {
      lg: "1280px", // Customizing the 'lg' breakpoint to 1250px
      // Add more custom breakpoints as needed
    },
  },
  plugins: [],
};
