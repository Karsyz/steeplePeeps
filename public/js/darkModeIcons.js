const html = document.querySelector('html')
const dmButton = document.querySelector('#darkModeButton')


// set darkMode to initially to browser preference
// if dark/light mode button is used, use the stored value and not the browser setting
let ls = localStorage.getItem('darkMode')
let darkMode = ls !== null ? JSON.parse(ls) : window.matchMedia("(prefers-color-scheme: dark)").matches

darkMode ? dark() : light()

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