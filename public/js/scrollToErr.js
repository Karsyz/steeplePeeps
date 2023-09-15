// adds highlight to table row element on scroll to link
const scrollToUser = document.querySelector('#scrollToUser')

scrollToUser.addEventListener('click', () => {

  const userId = scrollToUser.href.split('#')[1]

  document.getElementById(userId).style.background = '#5bb262'

  setTimeout( () => { 
    document.getElementById(userId).style.transition = 'background 3s ease' 
    document.getElementById(userId).style.background = '' 
  }, 4000 ) 
})
