// Image Upload

// activate img upload
document.getElementById('imgCog').addEventListener('click', activateImageUpload)
document.getElementById('imageUploadContainer').addEventListener('click', activateImageUpload )

function activateImageUpload(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle  
  document.getElementById('imageUploadContainer').classList.toggle('d-none')
}

document.addEventListener('keydown', function(evt){
	if(evt.key === "Escape"){
		document.getElementById('imageUploadContainer').classList.add('d-none')
	}
});

// preview file before after selection
const loadFile = (evt) => {
  const output = document.getElementById('uploadImagePreview');
  output.src = URL.createObjectURL(evt.target.files[0]);
  output.onload = () => URL.revokeObjectURL(output.src) // free memory
  document.querySelector('.imgPlaceholder').classList.add('d-none')
};
