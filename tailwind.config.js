/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      animation: {
        pCardModalEnter: {
          
        }
      },
      keyframes: {
        pCardModalEnter: {

        }
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
}


// Entering: "ease-out duration-300"
//   From: "opacity-0"
//   To: "opacity-100"

// Leaving: "ease-in duration-200"
//   From: "opacity-100"
//   To: "opacity-0"