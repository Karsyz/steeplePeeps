const html = document.querySelector('html')

// set darkMode to initially to browser preference
// if dark/light mode button is used, use the stored value and not the browser setting
let ls = localStorage.getItem('darkMode')
let darkMode = ls !== null ? JSON.parse(ls) : window.matchMedia("(prefers-color-scheme: dark)").matches

// set darkMode
darkMode && html.classList.add('dark')