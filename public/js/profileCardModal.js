// Activate/Deactivate Profile Card Modal

// selectors
const profileCardModalBg = document.querySelector('#profileCardModalBg')
const profileCard = document.querySelector('#profileCard')
const cardCloseButton = document.querySelector('#profileCardModalButton')
const hide = document.querySelectorAll('.hide')
const imgC = document.querySelectorAll('.imgC')

// event listeners
imgC.forEach(el => {el.addEventListener('click', activateCard)} ) 
cardCloseButton.addEventListener('click', deactivateCard)
profileCardModalBg.addEventListener('click', deactivateCard)

// escape key profile card modal close
document.addEventListener('keydown', function(evt) {
	if(evt.key === "Escape" && !profileCard.classList.contains('hidden')){
    hideAndClearData()
	}
}
);

async function activateCard(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle 
  const userId = evt.target.id
  await getCardInfo(userId)
  // wait for info to populate in dom
  setTimeout(function(){
    hide.forEach(el => {el.classList.remove('hidden')} ) 
    profileCardModalBg.classList.remove('opacity-0')
    profileCardModalBg.classList.add('opacity-100')
    profileCard.classList.remove('opacity-0')
    profileCard.classList.add('opacity-100')
  }, 500)
}

function deactivateCard(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle  
  hideAndClearData()
}

function hideAndClearData() {

  hide.forEach(el => {el.classList.add('hidden')} ) 
  profileCardModalBg.classList.remove('opacity-100')
  profileCardModalBg.classList.add('opacity-0')
  profileCard.classList.remove('opacity-100')
  profileCard.classList.add('opacity-0')

  document.getElementById('cardImage').src = ""
  document.getElementById('cardImage').alt = ""
  document.getElementById('cardName').textContent = ""
  document.getElementById('cardEmail').textContent = ""
  document.getElementById('cardPhone').textContent = ""
  document.getElementById('cardPhoneLink').href = ""
  document.getElementById('cardAddress1').textContent = ""
  document.getElementById('cardAddress2').textContent = ""
  document.getElementById('cardCity').textContent = ""
  document.getElementById('cardCountry').textContent = ""
  document.getElementById('cardPostalCode').textContent = ""
  document.getElementById('cardBio').textContent = ""
  
  // remove all the tags
  document.querySelectorAll('#cardICanHelpWith > li').forEach(e => e.remove())
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
              document.getElementById('cardPhoneLink').href = data.phoneNumber.replace(/\s/g, '')
              document.getElementById('cardAddress1').textContent = data.address1
              document.getElementById('cardAddress2').textContent = data.address2
              document.getElementById('cardCity').textContent = data.city
              document.getElementById('cardCountry').textContent = data.country
              document.getElementById('cardPostalCode').textContent = data.postCode
              document.getElementById('cardBio').textContent = data.bio

              if (data.txtOk) {
                document.getElementById('cardTxtOk').textContent = 'Phone & Txt'
              }else {
                document.getElementById('cardTxtOk').textContent = 'Phone Only'
              }

              if (data.address2 === "" || data.address2 === "Address 2") {
                document.getElementById('cardAddress2').classList.add('hidden')
              }

              // create tag elements
              const helpTagsCont = document.getElementById('cardICanHelpWith')
              if (data.iCanHelpWith !== null) {
                data.iCanHelpWith.forEach(tag => {
                const listItem = document.createElement('li');
                listItem.classList.add('bg-blue-300')
                listItem.classList.add('rounded-lg')
                listItem.classList.add('p-4')
                listItem.classList.add('font-semibold')
                listItem.textContent = tag
                helpTagsCont.appendChild(listItem);
                })
              }
            })
          .catch(err => {
              console.log(`error ${err}`)
          })
}


