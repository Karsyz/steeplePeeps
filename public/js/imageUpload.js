// Image Upload

// activate img upload
document.getElementById('imgCog').addEventListener('click', activateImageUpload)
// document.getElementById('imageUploadContainer').addEventListener('click', activateImageUpload)

function activateImageUpload() {
  document.getElementById('imageUploadContainer').classList.toggle('d-none')
  console.log('it works!')
}
