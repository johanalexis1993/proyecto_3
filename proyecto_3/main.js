import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: 'YtAozL29-5joqlosTWDB9fX_h5mksoL92q3wm6KKvDY'
})
const toggleTheme = () => {
  document.body.classList.toggle('dark')
}
const setupEventListeners = () => {
  const darkModeButton = document.querySelector('#darkmodebtn')
  darkModeButton.addEventListener('click', () => {
    toggleTheme()
    const theme = document.body.classList.contains('dark')
    document.querySelector('#darkmodeicon').src = theme
      ? 'https://placekitten.com/305/305'
      : 'https://placekitten.com/303/303'
  })
}
const initializeHeader = () => {
  setupEventListeners()
}
const generateCardTemplate = (item) => `
  <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 10px solid ${item.color}">
    <div class="info">
      <div class="save-btn">
        <button>Guardar</button>
      </div>
      <div class="links">
        <a href=${item.links.html} class="full-link">${item.links.html}</a>
        <div>
          <a href=${item.urls.full} target="_blank" class="links-icon">
            <img src="https://placekitten.com/306/306" alt="Upload icon"/>
          </a>
          <a href="#null" class="links-icon">
            <img src="https://placekitten.com/308/308" alt="More icon"/>
          </a>    
        </div>
      </div>
    </div>
  </li>
`
const createGalleryItem = (item) => {
  const li = document.createElement('li')
  li.className = 'gallery-item'
  li.style.backgroundImage = `url(${item.urls.regular})`
  li.style.border = `10px solid ${item.color}`
  li.innerHTML = generateCardTemplate(item)
  return li
}

const renderItems = (items) => {
  const gallery = document.querySelector('.gallery')
  const fragment = document.createDocumentFragment()
  for (const item of items) {
    fragment.appendChild(createGalleryItem(item))
  }
  gallery.innerHTML = ''
  gallery.appendChild(fragment)
}
const searchPhotos = async (keyword) => {
  try {
    const images = await unsplash.search.getPhotos({
      query: keyword,
      page: 1,
      perPage: 30
    })
    return images
  } catch (error) {
    console.error('Error fetching images:', error)
    return {}
  }
}
const setupGalleryListeners = async () => {
  const searchButton = document.querySelector('#searchbtn')
  const searchInput = document.querySelector('#searchinput')
  searchButton.addEventListener('click', async () => {
    const keyword = searchInput.value.trim()
    const images =
      keyword !== '' ? await searchPhotos(keyword) : await searchPhotos('moon')
    renderItems(images.response.results)
  })
  searchInput.addEventListener('input', async () => {
    setTimeout(async () => {
      const keyword = searchInput.value.trim()
      const images =
        keyword !== ''
          ? await searchPhotos(keyword)
          : await searchPhotos('moon')
      renderItems(images.response.results)
    }, 100)
  })
}
const initializeTemplate = async () => {
  setupGalleryListeners()
  const images = await searchPhotos('moon')
  renderItems(images.response.results)
}
initializeHeader()
initializeTemplate()
