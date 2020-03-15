// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area")
const getInfo = document.getElementById('galleryInfo')

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}



function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files
  handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar');

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  console.debug('update', fileNumber, percent, total)
  progressBar.classList.add('show');
  progressBar.value = total
}

function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length)
  files.forEach(uploadFile)
  files.forEach(previewFile)
}
function bytesToSize(bytes, seperator = "") {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes}${seperator}${sizes[i]}`
  return `${(bytes / (1024 ** i)).toFixed(1)}${seperator}${sizes[i]}`
}
function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  let arrInfoList = [];
  reader.onloadend = function() {
  	arrInfoList.push({
  		name: file.name,
  		size: bytesToSize(file.size)
  	})
  	const list = `<div>
  		${arrInfoList.map(inf => `<p class="small">name: ${inf.name} | size: ${inf.size}</p>`)}
  		<hr/>
  	</div>`
  	getInfo.insertAdjacentHTML('beforeend', list)
  }
}

function uploadFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
  	progressBar.classList.remove('show');
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
    	getInfo.insertAdjacentHTML('beforeend', `<p class="error small">${xhr.statusText}</p>`)
    	console.log(xhr.statusText)
      // Error. Inform the user
    }
  })

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}

const button = document.querySelector('.button');
const fileElem = document.querySelector('#fileElem')
fileElem.addEventListener('change', e => {
	handleFiles(e.target.files)
})
'mouseover mouseout touchstart'.split(' ').forEach( eventName => {
	button.addEventListener(eventName, e => {
		switch(eventName) {
		case 'mouseover':
		case 'touchstart':
			dropArea.classList.add('highlight')
			break;
		case 'mouseout':
			dropArea.classList.remove('highlight')
			break;
		}
	});
})