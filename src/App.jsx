import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/Error'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'
import './components/styles/header.css'
import './components/styles/infoBox.css'
import ImageText from './components/ImageText'

function App() {
  //para guardar una location 
  const [location, setLocation] = useState()
  //para guardar la informacion del input y hacer la peticion cuando se hace submit
  const [searchInput, setSearchInput] = useState("")
  //para guardar las sugerencias de la api
  const [suggestedList, setsuggestedList] = useState()
  //para indicar si hay error o no 
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()
    if (searchInput) {
      id = searchInput
    }
    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))

  }, [searchInput])

  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
  }

  const handleChange = event => {
    if (event.target.value === "") {
      return setsuggestedList()
    } else {
      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

      axios.get(URL)
        .then(res => setsuggestedList(res.data.results))
        .catch(err => console.log(err))
    }
  }
  console.log(suggestedList)

  return (

    <div className="App">
      <div className='headerApp'>
        <img className='name__logo' src="https://www.pngplay.com/wp-content/uploads/14/Rick-And-Morty-Logo-Transparent-File.png" alt="" />
        <form className='form' onSubmit={handleSubmit}>
          <input id='idLocation' className='input' onChange={handleChange} placeholder='Type a dimension number from 1 to 126 ' type="text" />
          <button className='search__btn'>Search</button>
          {/* <FilterList
            suggestedList={suggestedList}
            setSearchInput={setSearchInput}
          /> */}
        </form>
      </div>
      {
        hasError ?
          <ErrorScreen />
          :
          <>

            <LocationInfo location={location} />
            <div className='card-container'>
              {
                location?.residents.map(url => (
                  <CardResident
                    key={url}
                    url={url}

                  />
                ))
              }
            </div>
          </>
      }
    </div >
  )
}

export default App
