import { createApi } from "unsplash-js"
import { useState } from "react"

function App() {
  const [photos, setPhotos] = useState(null)

  const api = createApi({
    accessKey: "c998EbR5HC_BTOhQ8PPRUBF30o30HM50e-Zw0HPt4Z4",
  })

  api.search
    .getPhotos({ query: "dog" })
    .then((result) => console.log(result.response))

  // api.photos.getRandom().then((result) => console.log(result.response))

  return (
    <div className='App'>
      <h1>Image Gallery App</h1>
    </div>
  )
}

export default App
