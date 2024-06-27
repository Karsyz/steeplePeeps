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
  e.addEventListener('click', removeTag)
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

function addTag() {
  // console.log(input.value)
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

      document.querySelector(`#${tagId}`).addEventListener('click', removeTag)
      input.value = null
      getPageTags()
  }

}


function removeTag(evt) {
 document.getElementById(evt.target.id).remove()
  getPageTags()
}

