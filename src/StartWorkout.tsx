import { MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const StartWorkout = () => {
    const navigate = useNavigate()
    const [workoutType, setWorkoutType] = useState<string>()
    const handleChange = (event: SelectChangeEvent) => {
        setWorkoutType(event.target.value as string)
    }

    // const startWorkout = () => {

    // }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">
                Ready to Crush Your Workout Today? Let's Get Started!
            </h1>
            <div className="mb-6">
                <label htmlFor="workoutType" className="block mb-2 text-lg font-semibold text-gray-700">
                    What are you hitting today?
                </label>
                <Select
                    labelId="workout-select"
                    className="w-full"
                    id="workout-select"
                    value={workoutType}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={"CST"}>Chest, Shoulder & Triceps</MenuItem>
                    <MenuItem value={"BB"}>Back Biceps</MenuItem>
                    <MenuItem value={"LEG"}>Legs</MenuItem>
                    <MenuItem value={"CALI"}>Calistenics</MenuItem>
                </Select>
            </div>
            <button
                disabled={workoutType? false: true}
                onClick={() => navigate('/workout')}
                className="w-32 h-32 bg-blue-500 text-white rounded-full text-xl font-bold hover:bg-blue-700 transition duration-300"
            >
                Start
            </button>
        </div>
    )
}