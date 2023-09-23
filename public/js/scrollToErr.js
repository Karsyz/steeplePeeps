// adds highlight to table row element on scroll to link
let scrollToUser = document.querySelectorAll('.scrollToUser')

scrollToUser.forEach(e => e.addEventListener('click', () => {
  let userId = scrollToUser[0].href.split('#')[1]

  document.getElementById(userId).style.background = '#5bb262'

  setTimeout( () => { 
    document.getElementById(userId).style.transition = 'background 3s ease' 
    document.getElementById(userId).style.background = '' 
  }, 4000 ) 
}))
