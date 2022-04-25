module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba-light': "rgba(0, 0, 0, 0.2)",
        'black-rgba': "rgba(0, 0, 0, 0.4)",
        'black-rgba-medium': 'rgba(0, 0, 0, 0.7)',
        'black-rgba-dark': "rgba(0, 0, 0, 0.9)",
        'orange1' : "#ffd002",
        'orange2' : "#ff9b30",
        'd-orange1' : "#ff8561", 
        'd-orange2' : '#ff3f19'
      }, 
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        slide: 'slide .5s ease-in-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
