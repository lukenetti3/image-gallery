/* eslint-disable react-hooks/exhaustive-deps */
import { createApi } from "unsplash-js"
import { useState, useEffect } from "react"
import { RiCloseFill } from "react-icons/ri"

function App() {
  const [photos, setPhotos] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [modalImage, setModalImage] = useState("")
  const [pageNum, setPageNum] = useState(1)

  const api = createApi({
    accessKey: "c998EbR5HC_BTOhQ8PPRUBF30o30HM50e-Zw0HPt4Z4",
  })

  useEffect(() => {
    loadPhotos()
  }, [])

  function loadPhotos() {
    api.search
      .getPhotos({
        query: "cats",
        page: pageNum,
        perPage: 10,
      })
      .then((result) => {
        setPhotos([...photos, ...result.response.results])
        setPageNum((prevNum) => prevNum + 1)
      })
      .catch(() => {
        console.log("something broke")
      })
  }

  window.onscroll = function () {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      loadPhotos()
    }
  }

  function openLightbox(photo) {
    setIsModal(true)
    setModalImage(photo)
  }

  function renderModal(photo) {
    return (
      <div className='modal'>
        <RiCloseFill
          class='close'
          onClick={() => setIsModal(false)}
          size={"3em"}
        />
        <img className='modal-img' src={photo.urls.full} alt='' />
      </div>
    )
  }

  return (
    <div className='App'>
      {isModal && renderModal(modalImage)}
      <div className='container'>
        <h1 style={{ textAlign: "center" }}>Image Gallery App</h1>
        <div className='image-container'>
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
    </div>
  )
}

export default App
