// Darkmode
let darkMode
const dmSwich = document.getElementById('darkMode')

window.onload = () => {
  darkMode = localStorage.getItem('darkMode')
  if (darkMode === 'on') {
    dmSwich.checked = true
    dark()
  } else {
    dmSwich.checked = false
    light()
  }
}

dmSwich.addEventListener('click', () => {
  
  // Write switch state to local storage
  if (dmSwich.checked) {
    darkMode = 'on'
    localStorage.setItem('darkMode', 'on');
    dark()
  } else {
    darkMode = 'off'
    localStorage.setItem('darkMode', 'off');
    light()
  }
})

function dark() {
  document.querySelector('body').classList.add('theme-dark')
  document.querySelector('body').classList.remove('theme-light')
  // document.querySelector('body').classList.add('bg-dark')
  // document.querySelector('body').classList.add('text-light')
  
  // const ts = document.querySelectorAll('.ts')
  // ts.forEach( e => e.classList.add('text-light') )

  // const formLabels = document.querySelectorAll('.form-label')
  // formLabels.forEach( e => e.classList.add('text-light') )

  // // tables
  // if (document.querySelector('table') !== null) {
  //   document.querySelector('table').classList.add('table-dark')
  //   document.querySelector('thead').classList.add('table-secondary')
  //   document.querySelector('thead').classList.remove('table-dark')
  // }

  // const tda = document.querySelectorAll('.text-dark')
  // tda.forEach( e => e.classList.add('text-light') )

  // const tdb = document.querySelectorAll('.text-dark')
  // tdb.forEach( e => e.classList.remove('text-dark') )

  // document.querySelector('.imageUploadContainerInner').classList.add('bg-dark')

  // document.querySelector('.imgPlaceholder').classList.add('bg-dark')

  
  // const imgThumb = document.querySelectorAll('.img-thumbnail')
  // imgThumb.forEach( e => e.classList.remove('bg-dark') )

}

function light() {
  document.querySelector('body').classList.add('theme-light')
  document.querySelector('body').classList.remove('theme-dark')
//   document.querySelector('body').classList.remove('bg-dark')
//   document.querySelector('body').classList.remove('text-light')
  
//   const ts = document.querySelectorAll('.ts')
//   ts.forEach( e => e.classList.remove('text-light') )

//   const formLabels = document.querySelectorAll('.form-label')
//   formLabels.forEach( e => e.classList.remove('text-light') )

//   // tables
//   if (document.querySelector('table') !== null) {
//     document.querySelector('table').classList.remove('table-dark')
//     document.querySelector('thead').classList.remove('table-secondary')
//     document.querySelector('thead').classList.add('table-dark')
//   }

//   const tdb = document.querySelectorAll('.text-light')
//   tdb.forEach( e => e.classList.add('text-dark') )

//   const tda = document.querySelectorAll('.text-light')
//   tda.forEach( e => e.classList.remove('text-light') )

//   document.querySelector('.imageUploadContainerInner').classList.remove('bg-dark')
//   document.querySelector('.imgPlaceholder').classList.remove('bg-dark')

}