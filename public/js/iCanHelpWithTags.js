// set darkMode to initially to browser preference

// selectors
const dbTags = document.getElementById('iCanHelpWith')
const input = document.getElementById('helpTagInput')
const helpButton = document.getElementById('helpButton')
const iCanHelpWithCont = document.getElementById('iCanHelpWithCont')
const helpTags = document.querySelectorAll('#iCanHelpWithCont > li')

// event listeners
helpButton.addEventListener('click', addTag)

helpTags && helpTags.forEach(e => {
  e.addEventListener('mousedown', removeTag)
  e.addEventListener('mouseup', stopTimer)
  e.addEventListener('mouseout', stopTimer)
}) 

// get tags and declare tag container
let tagsCont = []

function getPageTags() {
  tagsCont = []
  for (let i = 0; i < iCanHelpWithCont.children.length; i++) {
    tagsCont.push(iCanHelpWithCont.children[i].innerText)
  }
  dbTags.value = tagsCont.join(', ')
}

getPageTags()

// create tag element
function addTag() {
  console.log(input.value)
  if (input.value !== null && input.value !== "") {
    const tagId = 'tag' + ( Math.floor( Math.random() * 100000 ) ).toString()
    const listItem = document.createElement('li');
      listItem.id = tagId
      listItem.classList.add('inline-block')
      listItem.classList.add('bg-orange-200')
      listItem.classList.add('rounded-lg')
      listItem.classList.add('px-3')
      listItem.classList.add('py-2')
      listItem.classList.add('text-gray-900')
      listItem.classList.add('text-base')
      listItem.classList.add('cursor-pointer')
      listItem.classList.add('hover:bg-red-500')
      listItem.classList.add('transition')
      listItem.classList.add('opacity-100')
      listItem.textContent = input.value
      iCanHelpWithCont.appendChild(listItem);

      document.querySelector(`#${tagId}`).addEventListener('mousedown', removeTag)
      document.querySelector(`#${tagId}`).addEventListener('mouseup', stopTimer)
      document.querySelector(`#${tagId}`).addEventListener('mouseout', stopTimer)

      input.value = null

      getPageTags()
  }

}

// global timer var
let timer

// long click tag remove
function removeTag(evt) {
  const selector = document.getElementById(evt.target.id)
  selector.style.opacity = 0.2
  selector.style.transition = 'opacity 2s ease'

  timer = setTimeout(() => {
      selector.remove()
      console.log('removed')  
      getPageTags()
    }, 1200 )
}

function stopTimer(evt) {
  const selector = document.getElementById(evt.target.id)
  clearTimeout(timer)
  selector.style.opacity = ''
  selector.style.transition = ''
  
}