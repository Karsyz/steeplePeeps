// set darkMode to initially to browser preference
let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
const html = document.querySelector('html')
const dmSwitch = document.querySelector('#darkModeButton')
const toggle = document.querySelector('#darkModeButton > span')

// set returning preference if any
window.onload = () => {
  darkMode = JSON.parse( localStorage.getItem('darkMode') )
  darkMode ? dark() : light()
}

dmSwitch.addEventListener('click', () => {
  if (darkMode) {
    darkMode = false
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    light()
  } else {
    darkMode = true
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    dark()
  }
})

function dark() {
  // set dark mode html class
  html.classList.add('dark')

  // set switch state
  dmSwitch.classList.remove('bg-gray-200')
  dmSwitch.classList.add('bg-blue-600')
  toggle.classList.remove('translate-x-0')
  toggle.classList.add('translate-x-5')

  
}

function light() {
  // set dark mode html class
  html.classList.remove('dark')

  // set switch state
  dmSwitch.classList.add('bg-gray-200')
  dmSwitch.classList.remove('bg-blue-600')
  toggle.classList.add('translate-x-0')
  toggle.classList.remove('translate-x-5')


}