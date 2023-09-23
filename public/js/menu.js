
const menu = document.querySelector('#menu')
const navCont = document.querySelector('#navCont')
const menuClose = document.querySelector('#menuClose')
const addUserModalCont = document.querySelector('#addUserModalCont')
const openAddUserButton = document.querySelector('#openAddUserButton')
const closeAddUserButton = document.querySelector('#closeAddUserButton')

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

openAddUserButton.addEventListener('click', () => {
  // addUserModalCont.classList.toggle('hidden')
  addUserModalCont.classList.remove('-translate-y-full')
  addUserModalCont.classList.add('translate-y-0')
})

closeAddUserButton.addEventListener('click', () => {
  // addUserModalCont.classList.toggle('hidden')
  addUserModalCont.classList.remove('translate-y-0')
  addUserModalCont.classList.add('-translate-y-full')
})