const dmButton = document.querySelector('#darkModeButton')

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

// set light/dark mode and change icon
darkMode ? dark() : light()

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