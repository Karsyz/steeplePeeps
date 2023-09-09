// Image Upload

// selectors
const cog = document.getElementById('imgCog')
const allHides = document.querySelectorAll('.hide')
const picUploadModalBg = document.getElementById('picUploadModalBg')
const picUploadCont = document.getElementById('picUploadCont')

// activate img upload
cog.addEventListener('click', activateImageUpload)

function activateImageUpload(evt) {
  if (evt.target !== this) return // this ensures child elements do not toggle  
  allHides.forEach(e => e.classList.toggle('hidden') )
  setTimeout(()=> {
    picUploadModalBg.classList.remove('opacity-0')
    picUploadModalBg.classList.add('opacity-80')
    picUploadCont.classList.remove('opacity-0')
    picUploadCont.classList.add('opacity-100')
  }, 100)


}

document.addEventListener('keydown', function(evt){
	if(evt.key === "Escape"){
		picUploadModalBg.classList.remove('opacity-80')
    picUploadModalBg.classList.add('opacity-0')
    picUploadCont.classList.remove('opacity-100')
    picUploadCont.classList.add('opacity-0')
    setTimeout(()=> {
      allHides.forEach(e => e.classList.toggle('hidden') )
    }, 300)
	}
});

// preview file before after selection
const loadFile = (evt) => {
  const output = document.getElementById('uploadImagePreview');
  output.src = URL.createObjectURL(evt.target.files[0]);
  output.onload = () => URL.revokeObjectURL(output.src) // free memory
  document.getElementById('uploadImagePreview').classList.remove('hidden')
};

