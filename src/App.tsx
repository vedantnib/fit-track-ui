import { BrowserRouter, Route, Routes } from "react-router-dom"
import { StartWorkout } from "./StartWorkout"
import { NewWorkout } from "./NewWorkout"
import { CurrentWorkout } from "./CurrentWorkout"

function App() {
  //const localEndpoint = `http://localhost:8080`
  const userId = 'vedantnib'
  
  const endpoint  = `https://fit-track-backend-8fd8a014be7a.herokuapp.com`

  return (
    <BrowserRouter>
      <div>
      <Routes>
          <Route path="/" element={<StartWorkout endpoint={endpoint} userId={userId}/>} />
          <Route path="/workout" element={<NewWorkout />} />
          <Route path="/workout/:workoutId" element={<CurrentWorkout userId={userId} endpoint={endpoint}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
