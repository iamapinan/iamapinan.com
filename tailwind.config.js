module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        knowledge: '#1F2937',
        it: '#3B82F6',
        modern: '#10B981'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}