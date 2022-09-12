const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fill: "repeat(auto-fill, minmax(270px, 1fr))"
      },
      fontFamily: {
        open: '"Open Sans"'
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".logo": {
          width: "50px"
        }
      });
    })
  ],
  corePlugins: { preflight: false }
};
