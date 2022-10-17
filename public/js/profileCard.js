// Image Upload

let directory = "<%directory%>"
// activate profile card
const imgC = document.querySelectorAll('.imgC')
imgC.forEach(el => {el.addEventListener('click', activateCard)} )
document.querySelector('.profileCardContainer').addEventListener('click', activateCard)

function activateCard(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle  
  document.getElementById('profileCardContainer').classList.toggle('d-none')
  const userId = evt.target.id
  getCardInfo(userId)
}

document.addEventListener('keydown', function(evt){
	if(evt.key === "Escape"){
		document.getElementById('profileCardContainer').classList.add('d-none')
	}
});


async function getCardInfo(userId) {
  const url = 'http://localhost:3000/profile/userProfile'
  fetch(`${url}/${userId}`)
          .then(res => res.json() )
          .then(data =>{
              console.log(data)
              document.querySelector('cardName').innerHTML = data.name
              // document.querySelector('.cont1').classList.toggle('none')
              // document.querySelector('.outsideContainer').classList.toggle('none')
              // document.querySelector('span.close').classList.toggle('none')
              // document.querySelector('h2').innerHTML = data.title
              // document.querySelector('p').innerHTML = data.explanation

  
          })
          .catch(err => {
              console.log(`error ${err}`)
          })
  
}