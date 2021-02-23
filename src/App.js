/* eslint-disable react-hooks/exhaustive-deps */
import { createApi } from "unsplash-js"
import { useState, useEffect } from "react"
import { RiCloseFill } from "react-icons/ri"
import Header from "./components/Header"

function App() {
  const [photos, setPhotos] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [modalImage, setModalImage] = useState("")
  const [pageNum, setPageNum] = useState(1)
  const [isGridView, setIsGridView] = useState(true)
  const [category, setCategory] = useState("pets")
  const [bottomOfPage, setBottomOfPage] = useState(false)

  const api = createApi({
    accessKey: "c998EbR5HC_BTOhQ8PPRUBF30o30HM50e-Zw0HPt4Z4",
  })

  useEffect(() => {
    api.search
      .getPhotos({
        query: category,
        page: pageNum,
        perPage: 10,
      })
      .then((result) => {
        setPhotos([...photos, ...result.response.results])
      })
      .catch(() => {
        console.log("something broke")
      })
  }, [pageNum])

  function loadCategory(item) {
    setBottomOfPage(true)
    setPhotos([])
    setPageNum((prevNum) => prevNum + 1)
    setCategory(item)
  }

  function reachedBottom() {
    setBottomOfPage(false)
    setPageNum((prevNum) => prevNum + 1)
  }

  window.onscroll = function () {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      setBottomOfPage(true)
      if (bottomOfPage) {
        reachedBottom()
      }
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
          className='close'
          onClick={() => setIsModal(false)}
          size={"3em"}
        />
        <div className='user-content'>
          <p>{`Created by: ${photo.user.name}`}</p>
        </div>
        <img
          className={
            photo.width > photo.height ? "modal-landscape" : "modal-portrait"
          }
          src={photo.urls.full}
          alt={photos.alt_description}
        />
      </div>
    )
  }

  return (
    <div className='App'>
      <Header />
      {isModal && renderModal(modalImage)}
      <div className='container' style={{ textAlign: "center" }}>
        <button
          onClick={() => loadCategory("pets")}
          className='category-selectors'
        >
          Pets
        </button>
        <button
          onClick={() => loadCategory("nature")}
          className='category-selectors'
        >
          Nature
        </button>
        <button
          onClick={() => loadCategory("cars")}
          className='category-selectors'
        >
          Cars
        </button>
        <br />
        <button onClick={() => setIsGridView(!isGridView)}>
          {isGridView ? "List View" : "Grid View"}
        </button>
        <div className={isGridView ? "grid-container" : "list-container"}>
          {photos.map((photo) => {
            console.log(photo.created_at)
            return (
              <div
                className={
                  photo.width > photo.height ? "landscape" : "portrait"
                }
                key={photo.blur_hash}
              >
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description}
                  key={photo.id}
                  onClick={() => openLightbox(photo)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
