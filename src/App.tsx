import { Route, Routes, useNavigate } from "react-router-dom"
import { StartWorkout } from "./StartWorkout"
import { AllWorkouts } from "./AllWorkouts"
import { CurrentWorkout } from "./CurrentWorkout"
import { WorkoutView } from "./WorkoutView"
import { ExerciseUpdate } from "./ExerciseUpdate"
import { UserLogin } from "./UserLogin"
import { UserRegister } from "./UserRegister"
import { useEffect, useState } from "react"

function App() {
  //const endpoint = `http://localhost:8080`
  const [userId, setUserId] = useState<string | null>(null);  
  const endpoint  = `https://fit-track-backend-8fd8a014be7a.herokuapp.com`
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (!token) {
      navigate("/login");
    }
    else {
      const savedUserId = localStorage.getItem("userId");
      if (savedUserId) {
        setUserId(savedUserId); // Set userId from localStorage
      }
    }
  }, [navigate]);

  const handleLoginSuccess = (username: string) => {
    setUserId(username); // Update userId after login
    localStorage.setItem("userId", username); // Optionally, save to localStorage
    navigate("/"); // Redirect to the homepage after login
  };

  return (
      <div>
        <Routes>
          <Route path="/login" element={<UserLogin endpoint={endpoint} handleLoginSuccess={handleLoginSuccess}/>} />
          <Route path="/register" element={<UserRegister />} />
          {userId && <Route path="/" element={<StartWorkout endpoint={endpoint} userId={userId} />} />}
          {userId && <Route path="/workouts" element={<AllWorkouts userId={userId} endpoint={endpoint} />} />}
          {userId &&<Route path="/workout/:workoutId" element={<CurrentWorkout userId={userId} endpoint={endpoint} />} />}
          {userId &&<Route path="/workout/:workoutId/view" element={<WorkoutView userId={userId} endpoint={endpoint} />} />}
          {userId &&<Route path="/workout/:workoutId/exercises/:exerciseId/update" element={<ExerciseUpdate userId={userId} endpoint={endpoint} />} />}
        </Routes>
      </div>
  )
}

export default App
