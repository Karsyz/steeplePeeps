// set darkMode to initially to browser preference

// selectors
const txtOkToggle = document.getElementById('txtOkToggle')
const togbtn = document.getElementById('togbtn')
const togbtnX = document.getElementById('togbtnX')
const togbtnChk = document.getElementById('togbtnChk')
const txtOk = document.getElementById('txtOk')

// eventlisteners
txtOkToggle.addEventListener('click', toggleTxtOkSwitch)

// set switch position on page load
if(txtOk.checked) {
  toggleOn() 
}else {
  toggleOff() 
}

function toggleTxtOkSwitch() {
  if(txtOk.checked) {
    toggleOff() 
    txtOk.checked = false
  }else {
    toggleOn() 
    txtOk.checked = true
  }
}

function toggleOn() {
  // set switch state
  txtOkToggle.classList.remove('bg-gray-200')
  txtOkToggle.classList.add('bg-blue-700')

  togbtn.classList.remove('translate-x-0')
  togbtn.classList.add('translate-x-5')

  togbtnX.classList.remove('opacity-100')
  togbtnX.classList.remove('duration-200')
  togbtnX.classList.remove('ease-in')
  togbtnX.classList.add('opacity-0')
  togbtnX.classList.add('duration-20')
  togbtnX.classList.add('ease-in')

  togbtnChk.classList.remove('opacity-0')
  togbtnChk.classList.remove('duration-100')
  togbtnChk.classList.remove('ease-out')
  togbtnChk.classList.add('opacity-100')
  togbtnChk.classList.add('duration-200')
  togbtnChk.classList.add('ease-in')
}

function toggleOff() {
  // set switch state
  txtOkToggle.classList.add('bg-gray-200')
  txtOkToggle.classList.remove('bg-blue-700')

  togbtn.classList.add('translate-x-0')
  togbtn.classList.remove('translate-x-5')

  togbtnX.classList.add('opacity-100')
  togbtnX.classList.add('duration-200')
  togbtnX.classList.add('ease-in')
  togbtnX.classList.remove('opacity-0')
  togbtnX.classList.remove('duration-20')
  togbtnX.classList.remove('ease-in')

  togbtnChk.classList.add('opacity-0')
  togbtnChk.classList.add('duration-100')
  togbtnChk.classList.add('ease-out')
  togbtnChk.classList.remove('opacity-100')
  togbtnChk.classList.remove('duration-200')
  togbtnChk.classList.remove('ease-in')
}