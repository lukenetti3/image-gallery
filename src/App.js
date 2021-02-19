/* eslint-disable react-hooks/exhaustive-deps */
import { createApi } from "unsplash-js"
import { useState, useEffect } from "react"

function App() {
  const [photos, setPhotos] = useState([])
  // const [isModal, setIsModal] = useState(false)
  // const [modalImage, setModalImage] = useState("")
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
        query: "dogs",
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

  return (
    <div className='App'>
      <div className='container'>
        <h1 style={{ textAlign: "center" }}>Image Gallery App</h1>
        <div className='image-container'>
          {photos.map((photo) => {
            return (
              <img
                src={photo.urls.full}
                alt={photo.alt_description}
                key={photo.id}
              />
            )
          })}
        </div>
      </div>
      {/* {isModal ? (
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
      )} */}
    </div>
  )
}

export default App
