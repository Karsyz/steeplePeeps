// set darkMode to initially to browser preference
let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
const html = document.querySelector('html')
const dmButton = document.querySelector('#darkModeButton')

// set returning preference if any
window.onload = () => {
  darkMode = JSON.parse( localStorage.getItem('darkMode') )
  darkMode ? dark() : light()
}

dmButton.addEventListener('click', () => {
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

  // set icon
  dmButton.classList.remove('fa-moon')
  dmButton.classList.add('fa-sun')
}

function light() {
  // set dark mode html class
  html.classList.remove('dark')

  // set icon
  dmButton.classList.remove('fa-sun')
  dmButton.classList.add('fa-moon')
}