import { BrowserRouter, Route, Routes } from "react-router-dom"
import { StartWorkout } from "./StartWorkout"
import { CurrentWorkout } from "./CurrentWorkout"

function App() {

  return (
    <BrowserRouter>
      <div>
      <Routes>
          <Route path="/" element={<StartWorkout />} />
          <Route path="/workout" element={<CurrentWorkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
