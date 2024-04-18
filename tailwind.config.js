/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        scale: {
          "0%,100%": { transform: "scale(1.5)" },
          "50%": { transform: "none" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        scale: "scale 1s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      fontSize:{
        sm: "clamp(0.8rem, -0.12vi + 0.85rem, 0.75rem)",
        base: "clamp(1rem, 0vi + 1rem, 1rem)",
        lg: "clamp(1.25rem, 0.21vi + 1.17rem, 1.33rem)",
        xl: "clamp(1.56rem, 0.54vi + 1.35rem, 1.78rem)",
        "2xl": "clamp(1.95rem, 1.04vi + 1.54rem, 2.37rem)",
       "3xl": "clamp(2.44rem, 1.79vi + 1.73rem, 3.16rem)",
        "4xl": "clamp(3.05rem, 2.89vi + 1.89rem, 4.21rem)",
        "5xl": "clamp(3.81rem, 4.49vi + 2.02rem, 5.61rem)",
        "6xl": "clamp(4.77rem, 6.78vi + 2.06rem, 7.48rem)"
       },

    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    // plugin(function ({ matchUtilities, theme }) {
    //   matchUtilities(
    //     {
    //       'text-shadow': (value) => ({
    //         textShadow: value,
    //       }),
    //     },
    //     { values: theme('textShadow') }
    //   )
    // }),
  ],
};