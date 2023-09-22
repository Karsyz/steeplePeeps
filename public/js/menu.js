
const menu = document.querySelector('#menu')
const navCont = document.querySelector('#navCont')
const menuClose = document.querySelector('#menuClose')


menu.addEventListener('click', () => {
  // menu.classList.toggle('hidden')
  navCont.classList.remove('translate-x-full')
  navCont.classList.add('translate-x-0')
})

menuClose.addEventListener('click', deactivateMenu)

function deactivateMenu() {
  navCont.classList.remove('translate-x-0')
  navCont.classList.add('translate-x-full')
}