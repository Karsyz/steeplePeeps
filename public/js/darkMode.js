// Darkmode

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
// console.log(isDark)


let darkMode
const dmSwich = document.getElementById('darkMode')

window.onload = () => {
  darkMode = localStorage.getItem('darkMode')
  if (darkMode === 'on') {
    dmSwich.checked = true
    dark()
  } else {
    dmSwich.checked = false
    light()
  }
}

dmSwich.addEventListener('click', () => {
  
  // Write switch state to local storage
  if (dmSwich.checked) {
    darkMode = 'on'
    localStorage.setItem('darkMode', 'on');
    dark()
  } else {
    darkMode = 'off'
    localStorage.setItem('darkMode', 'off');
    light()
  }
})

function dark() {
  document.querySelector('body').classList.add('theme-dark')
  document.querySelector('body').classList.remove('theme-light')
}

function light() {
  document.querySelector('body').classList.add('theme-light')
  document.querySelector('body').classList.remove('theme-dark')
}