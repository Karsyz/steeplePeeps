// Image Upload

// declare card container
const cardCont = document.querySelector('.profileCardContainer')

// activate profile card
const imgC = document.querySelectorAll('.imgC')
const cards = document.querySelectorAll('.fa-id-card')
imgC.forEach(el => {el.addEventListener('click', activateCard)} ) 
cards.forEach(el => {el.addEventListener('click', activateCard)} )

// deactivate profile card
cardCont.addEventListener('click', deactivateCard)


document.addEventListener('keydown', function(evt){
	if(evt.key === "Escape" && !cardCont.classList.contains('d-none')){
    dNoneAndClerData()
	}
});

async function activateCard(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle 
  const userId = evt.target.id
  await getCardInfo(userId)
  // wait for info to populate in dom
  setTimeout(function(){cardCont.classList.remove('d-none')}, 500)
}

function deactivateCard(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle  
  dNoneAndClerData()
}

function dNoneAndClerData() {
  cardCont.classList.add('d-none')
  document.getElementById('cardImage').src = ""
  document.getElementById('cardImage').alt = ""
  document.getElementById('cardName').textContent = ""
  document.getElementById('cardEmail').textContent = ""
  document.getElementById('cardPhone').textContent = ""
  document.getElementById('cardAddress1').textContent = ""
  document.getElementById('cardAddress2').textContent = ""
  document.getElementById('cardCity').textContent = ""
  document.getElementById('cardCountry').textContent = ""
  document.getElementById('cardPostalCode').textContent = ""
  document.getElementById('cardBio').textContent = ""
  document.getElementById('cardICanHelpWith').textContent = ""
}



async function getCardInfo(userId) {
  const url = '/profile/userProfile'
  fetch(`${url}/${userId}`)
          .then(res => res.json() )
          .then(data => {
              document.getElementById('cardImage').src = data.image
              document.getElementById('cardImage').alt = `Picture of ${data.name}`
              document.getElementById('cardName').textContent = data.name
              document.getElementById('cardEmail').textContent = data.email
              document.getElementById('cardPhone').textContent = data.phoneNumber
              document.getElementById('cardAddress1').textContent = data.address1
              document.getElementById('cardAddress2').textContent = data.address2
              document.getElementById('cardCity').textContent = data.city
              document.getElementById('cardCountry').textContent = data.country
              document.getElementById('cardPostalCode').textContent = data.postCode
              document.getElementById('cardBio').textContent = data.bio
              document.getElementById('cardICanHelpWith').textContent = data.iCanHelpWith

              if (data.txtOk) {
                document.getElementById('cardTxtOk').textContent = 'Phone & Txt: '
              }else {
                document.getElementById('cardTxtOk').textContent = 'Phone Only: '
              }

              if (data.address2 === "" || data.address2 === "Address 2") {
                document.getElementById('cardAddress2').classList.add('d-none')
              }

          })
          .catch(err => {
              console.log(`error ${err}`)
          })
  
}