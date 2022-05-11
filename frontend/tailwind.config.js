const windmill = require('@windmill/react-ui/config')
module.exports = windmill({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
})