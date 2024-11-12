module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "node_modules/@ctrl/ngx-emoji-mart/picker.css"
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.5s ease-in-out',
        rotate: 'rotate 0.5s linear',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-2px)' },
          '40%, 80%': { transform: 'translateX(2px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
