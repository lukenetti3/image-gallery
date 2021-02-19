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

  const api = createApi({
    accessKey: "c998EbR5HC_BTOhQ8PPRUBF30o30HM50e-Zw0HPt4Z4",
  })

  useEffect(() => {
    loadPhotos()
  }, [])

  function loadPhotos() {
    console.log(category)
    api.search
      .getPhotos({
        query: category,
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

  function loadCategory(item) {
    setCategory(item)
    setPageNum(1)
    setPhotos([])
    setTimeout(() => {
      loadPhotos()
    }, 1000)
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
          className='close'
          onClick={() => setIsModal(false)}
          size={"3em"}
        />
        <img className='modal-img' src={photo.urls.full} alt='' />
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
          onClick={() => loadCategory("instruments")}
          className='category-selectors'
        >
          Instruments
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
