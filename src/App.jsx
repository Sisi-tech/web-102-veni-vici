import { useState, useEffect } from 'react'
import axios from 'axios';


function App() {
  const [dogData, setDogData] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiKey = "live_EGnXUqIdCkiU9EOqR2aHCtp6ByaDSW3oFFx17NMNrzhw46tM0QhRbYyBPl5wtY95"
  const URL = `https://api.thedogapi.com/v1/images/search?limit=10&api_key=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(URL);
      setDogData(response.data);
      console.log(response)
    }
    fetchData();
  }, [])

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dogData.length);
  }

  return (
    <div className='relative h-screen w-full flex justify-center text-white'>
      <div className="absolute inset-0 bg-cover bg-[url('./assets/dog1.jpg')] w-4/5"></div>
      <div className='absolute inset-0 bg-gray-900 bg-opacity-70'></div>
      <div className='absolute w-full grid grid-cols-5 gap-5 text-center'>

        {/* History side */}
        <div className='col-span-1 h-screen shadow-md shadow-gray-900 pt-10'>
          <h2 className='text-2xl'>Who have we seen so far?</h2>
          <div className='flex flex-col justify-center items-center pt-4 gap-2'>
            <img src="src/assets/dog2.jpg" className='w-[120px] rounded-sm shadow-md shadow-gray-500' />
            <p>Description</p>
          </div>
        </div>

        {/* main screen */}
        <div className='h-auto flex flex-col justify-center items-center gap-5 col-span-3 shadow-lg shadow-gray-600'>
          <h2 className='text-4xl'>Veni Vici!</h2>
          <h3 className='text-xl'>Discover dogs from your wildest dreams!</h3>
          <p>😼🧸ྀི 😻😸 😽૮₍ ´ ꒳ `₎ა</p>
          {dogData && dogData.length > 0 && dogData[currentIndex].breeds.length > 0 ? (
            <div>
              <p className='text-2xl pb-4'>{ dogData[currentIndex].breeds[0].name || " " }</p>
              <div className='flex justify-center gap-6'>
              <p className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg'>Height: {dogData[currentIndex].breeds[0].height.metric || ""}</p>
              <p className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg'>{dogData[currentIndex].breeds[0].weight.metric || "" } lbs</p>
              <p className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg'>{dogData[currentIndex].breeds[0].bred_for || "" }</p>
              <p className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg'>{dogData[currentIndex].breeds[0].life_span || ""}</p>
              </div>
            </div>
          ) : (
            <p>No breed information available</p>
          )
        }
          <img src={dogData && dogData.length > 0 ? dogData[currentIndex]?.url: "loading"} alt={dogData && dogData.length > 0 ? dogData[currentIndex]?.id : ""} className='w-[440px] rounded-lg shadow-md shadow-gray-700 h-max-[70vh] overflow-y-auto' />
          <button onClick={handleNextImage} className='bg-black border-none p-2 rounded-full shadow-md shadow-gray-500 mt-8'>Discover</button>
        </div>

        {/* ban list - right side */}
        <div className='flex  flex-col items-center gap-4 col-span-1 pt-10'>
          <h2 className='text-2xl'>Ban List</h2>
          <p>Select an attribute in your listing to ban it</p>
          <button className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg shadow-md shadow-gray-700'>Russia</button>
          <button className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg shadow-md shadow-gray-700'>10 - 12 years</button>
          <button className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg shadow-md shadow-gray-700'>Javanese</button>
          <button className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg shadow-md shadow-gray-700'>Turkey</button>
          <button className='bg-orange-400 p-1 pl-4 pr-4 rounded-lg shadow-md shadow-gray-700'>8 - 18 lbs</button>
        </div>
      </div>
    </div>
  )
}

export default App
