// Image Upload

// activate profile card
const imgC = document.querySelectorAll('.imgC')
const cards = document.querySelectorAll('.fa-id-card')
imgC.forEach(el => {el.addEventListener('click', activateCard)} ) 
cards.forEach(el => {el.addEventListener('click', activateCard)} )

// deactivate profile card
document.querySelector('.profileCardContainer').addEventListener('click', deactivateCard)

document.addEventListener('keydown', function(evt){
  console.log(evt.key)
  if(evt.key === "Escape"){
    deactivateCard(evt)
  }
});

function activateCard(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle  
  document.getElementById('profileCardContainer').classList.remove('d-none')
  const userId = evt.target.id
  getCardInfo(userId)
}

function deactivateCard(evt) {
  // if (evt.target !== this) return // this ensures child elements do not toggle  
  document.getElementById('profileCardContainer').classList.add('d-none')
  // remove data from dom
  document.getElementById('cardImage').src = ""
  document.getElementById('cardImage').alt = ""
  document.getElementById('cardName').innerHTML = ""
  document.getElementById('cardEmail').innerHTML = ""
  document.getElementById('cardPhone').innerHTML = ""
  document.getElementById('cardAddress1').innerHTML = ""
  document.getElementById('cardAddress2').innerHTML = ""
  document.getElementById('cardCity').innerHTML = ""
  document.getElementById('cardCountry').innerHTML = ""
  document.getElementById('cardPostalCode').innerHTML = ""
  document.getElementById('cardBio').innerHTML = ""
  document.getElementById('cardICanHelpWith').innerHTML = ""
}



async function getCardInfo(userId) {
  const url = 'http://localhost:3000/profile/userProfile'
  fetch(`${url}/${userId}`)
          .then(res => res.json() )
          .then(data =>{
              console.log(data)
              document.getElementById('cardImage').src = data.image
              document.getElementById('cardImage').alt = `Picture of ${data.name}`
              document.getElementById('cardName').innerHTML = data.name
              document.getElementById('cardEmail').innerHTML = data.email
              document.getElementById('cardPhone').innerHTML = data.phoneNumber
              document.getElementById('cardAddress1').innerHTML = data.address1
              document.getElementById('cardAddress2').innerHTML = data.address2
              document.getElementById('cardCity').innerHTML = data.city
              document.getElementById('cardCountry').innerHTML = data.country
              document.getElementById('cardPostalCode').innerHTML = data.postCode
              document.getElementById('cardBio').innerHTML = data.bio
              document.getElementById('cardICanHelpWith').innerHTML = data.iCanHelpWith

              if (data.txtOk) {
                document.getElementById('cardTxtOk').innerHTML = 'Phone & Txt: '
              }else {
                document.getElementById('cardTxtOk').innerHTML = 'Phone Only: '
              }

              if (data.address2 === "" || data.address === "Address 2") {
                document.getElementById('cardAddress2Container').classList.add('d-none')
              }

  
          })
          .catch(err => {
              console.log(`error ${err}`)
          })
  
}