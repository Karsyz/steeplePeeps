// search bar
// Activate/Deactivate Profile Card Modal

// selectors
const profileCardModalBg = document.querySelector('#profileCardModalBg')
const profileCard = document.querySelector('#profileCard')
const cardCloseButton = document.querySelector('#profileCardModalButton')
const hide = document.querySelectorAll('.hide')
const imgC = document.querySelectorAll('.imgC')
const searchInput = document.querySelector('#search')
const searchButton = document.querySelector('#searchSubmit')
const searchErrorMessage = document.querySelector('#searchErrorMessage')

// event listeners
imgC.forEach(el => {el.addEventListener('click', activateCard)} ) 
cardCloseButton.addEventListener('click', deactivateCard)
profileCardModalBg.addEventListener('click', deactivateCard)

if (searchButton) {
  searchButton.addEventListener('click', searchForUser)
  
  // search for user
  async function searchForUser() {
    const searchTerm = searchInput.value
    searchInput.value = ''
    searchErrorMessage.textContent = ''
    const url = '/profile/userProfile/search'
    fetch(`${url}/${searchTerm}`)
      .then(res => res.json() )
      .then(data => {
        // userData = data
        if(data.length === 0) {
          searchErrorMessage.textContent = 'No user found by that name'
          return
        } 
  
    getCardInfo(data[0]._id) 
    // wait for info to populate in dom
    hide.forEach(el => {
    el.classList.remove('hidden')} ) 
  
    setTimeout(function(){
      profileCardModalBg.style.opacity = 1
      profileCard.style.opacity = 1
    }, 500)
  
  })
  }
}


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
  hide.forEach(el => {
    el.classList.remove('hidden')} ) 

  setTimeout(function(){
    profileCardModalBg.style.opacity = 1
    profileCard.style.opacity = 1
  }, 500)
}

function deactivateCard(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle  
  hideAndClearData()
}

function hideAndClearData() {

  profileCardModalBg.style.opacity = ''
  profileCard.style.opacity = ''
  
  setTimeout(function(){
    hide.forEach(el => {el.classList.add('hidden')} ) 

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
  }, 200)

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
              document.getElementById('cardEmail').href = `mailto:${data.email}`
              document.getElementById('cardPhone').textContent = data.phoneNumber
              document.getElementById('cardPhoneLink').href = `tel:${data.phoneNumber.replace(/\s/g, '')}`
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


