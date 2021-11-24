import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { fetchTrending, fetchSearch } from './api'
import Modal from '@mui/material/Modal';

// 1. On initial load, it should display trending gifs
// 2. User should be able to search with text, and then display the searched gifs
// 3, If you click on a thumbnail of a gif it should display the bigger gif 
// image in either a new page or modal with details about its rating, 
// username, any other details you find interesting.

// nav bar
// main screen 

// search bar
// when press enter on search
// if empty then show trending gifs
// otherwise do a fetch req on the gifs with that search param

function App() {
  const [gifs, setGifs] = useState([])
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeGif, setActiveGif] = useState(null)

  useEffect(async () => {
    console.log(await fetchTrending())
    setGifs(await fetchTrending())
  }, [])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSearch = async () => {
    if (query) {
      setGifs(await fetchSearch(query))
    } else {
      setGifs(await fetchTrending())
    }
  }

  const openModal = (gif) => {
    setActiveGif(gif)
    setIsOpen(true)
  }

  return (
    <div className="App">
      <h1>GIFS</h1>
      <div styles={{display: 'flex', flexDirection: "row"}}>
        <input type="search" id="search-box" placeholder="Find a gif" onChange={handleQueryChange}/>
        <button onClick={(() => handleSearch())}>Search</button>
      </div>
      {gifs.map(gif => {
        // div with on click
        return (
          <div onClick={() => openModal(gif)} >
            <img key={gif.id} src={gif.images.original.url} />
          </div>
        )
        
      })}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {activeGif ? (
          <>
            <img src={activeGif.images.original.url} width={500} height={500} />
            <p>Rating: {activeGif.rating}</p>
            <p>Username: {activeGif.username}</p>
          </>
          ) : <h1>No Gif selected</h1>}
        </div>
      </Modal>
    </div>
  )
}

export default App
