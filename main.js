const grid = document.querySelector('.masonry-gallery')

const macyInstance = Macy({
	container: grid,
	breakAt: {
		1600: 5,
		1200: 4,
		900: 3,
		600: 2,
		400: 1,
	},
	margin: {
		x: 15,
		y: 15,
	},
})

const key = 'euufYzmzg-MEacTtk08eyieUi-au4QAHn8LKMGUJK0s'

const API_URL = 'https://api.unsplash.com'

const fixStartUpBug = () => {
	macyInstance.runOnImageLoad(function () {
		macyInstance.recalculate(true, true)
		var evt = document.createEvent('UIEvents')
		evt.initUIEvent('resize', true, false, window, 0)
		window.dispatchEvent(evt)
	}, true)
}

const addImagesInDom = images => {
	images.forEach(image => {
		const container = document.createElement('div')

		const img = document.createElement('img')

		img.src = image
		container.append(img)

		grid.append(container)
	})
}

const intializeImages = async () => {
	let response = await fetch(
		`${API_URL}/search/photos?query=t-shirt&per_page=10&client_id=${key}`
	)
    let images = await response.json();

	images = images.results.map(image => image.urls.regular)
    
	addImagesInDom(images)

	fixStartUpBug()
}

intializeImages()


// Get the button:
let scrollToTopButton = document.getElementById("scroll-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}