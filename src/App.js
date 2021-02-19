/* eslint-disable react-hooks/exhaustive-deps */
import { createApi } from "unsplash-js"
import { useState, useEffect } from "react"

function App() {
  const [photos, setPhotos] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [modalImage, setModalImage] = useState("")
  const [pageNum, setPageNum] = useState(0)

  const api = createApi({
    accessKey: "c998EbR5HC_BTOhQ8PPRUBF30o30HM50e-Zw0HPt4Z4",
  })

  useEffect(() => {
    api.search
      .getPhotos({ query: "cats" })
      .then((result) => setPhotos(result.response.results))
      .catch(() => {
        console.log("something is broke")
      })
  }, [pageNum])

  const openLightbox = (photo) => {
    setModalImage(photo)

    setIsModal(true)
  }

  return (
    <div className='App'>
      <div className='container'>
        <h1 style={{ textAlign: "center" }}>Image Gallery App</h1>
        <div className='image-container'>
          {console.log(photos)}
          {photos.map((photo) => {
            return (
              <img
                src={photo.urls.full}
                alt={photo.alt_description}
                key={photo.id}
                onClick={() => openLightbox(photo)}
              />
            )
          })}
        </div>
      </div>
      {isModal ? (
        <div className='lightbox'>
          <h1>{modalImage.alt_description}</h1>
          <img
            src={modalImage.urls.small}
            alt={modalImage.alt_description}
            className='lightbox-image'
          />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default App

// TODO:
// - Add lightbox to images when clicked
// - Setup infinite scroll
// - Change mode between list and grid
