import { BrowserRouter, Route, Routes } from "react-router-dom"
import { StartWorkout } from "./StartWorkout"
import { AllWorkouts } from "./AllWorkouts"
import { CurrentWorkout } from "./CurrentWorkout"
import { WorkoutView } from "./WorkoutView"
import { ExerciseUpdate } from "./ExerciseUpdate"

function App() {
  //const endpoint = `http://localhost:8080`
  //const userId = 'testvedantnib'
  const userId = 'vedantnib'
  
  const endpoint  = `https://fit-track-backend-8fd8a014be7a.herokuapp.com`

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<StartWorkout endpoint={endpoint} userId={userId} />} />
          <Route path="/workouts" element={<AllWorkouts userId={userId} endpoint={endpoint} />} />
          <Route path="/workout/:workoutId" element={<CurrentWorkout userId={userId} endpoint={endpoint} />} />
          <Route path="/workout/:workoutId/view" element={<WorkoutView userId={userId} endpoint={endpoint} />} />
          <Route path="/workout/:workoutId/exercises/:exerciseId/update" element={<ExerciseUpdate userId={userId} endpoint={endpoint} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
