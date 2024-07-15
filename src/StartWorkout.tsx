import { MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InProgressWorkoutTile from "./InProgressWorkoutTile"
import axios from "axios"
import LastCompletedWorkoutTile from "./LastCompletedWorkoutTile"

interface StartWorkoutProps {
    endpoint: string,
    userId: string
}

export const StartWorkout = ({
    endpoint, userId
}: StartWorkoutProps) => {
    const navigate = useNavigate();
    const [workoutType, setWorkoutType] = useState<string>();
    const [inProgressWorkoutId, setInProgressWorkoutId] = useState<string | undefined>()
    const [inProgressWorkoutType, setInProgressWorkoutType] = useState<string | undefined>()
    const [lastCompletedWorkout, setLastCompletedWorkout] = useState<any>()

    const handleChange = (event: SelectChangeEvent) => {
        setWorkoutType(event.target.value as string);
    };

    useEffect(() => {
        axios.get(endpoint + `/api/v1/workouts/${userId}?status=IN_PROGRESS`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(( { data }) => {
            const workoutInProgress = data
            if (workoutInProgress.length > 0) {
                const inProgressWorkoutId = workoutInProgress[0]?.workoutId
                const inProgressWorkoutType = workoutInProgress[0]?.workoutType
                setInProgressWorkoutId(inProgressWorkoutId)
                setInProgressWorkoutType(inProgressWorkoutType)
            }
            axios.get(endpoint + `/api/v1/workouts/${userId}/workout/latest`).then(({ data })=> {
                if (data) setLastCompletedWorkout(data)
            })
        })
        
    }, [])

    const startWorkout = async () => {
        let data = {
          workoutType: workoutType,
          status: "IN_PROGRESS",
          userId: userId,
          start: new Date().toISOString(),
          dateTime: new Date().toISOString(),
        };
      
        try {
          await axios.post(
            endpoint + `/api/v1/workouts`,
            data,
            {
              headers: { 
                'Content-Type': 'application/json',
              },
              maxBodyLength: Infinity
            }
          ).then(({ data }) => {
                const { workoutId } = data
                navigate(`/workout/${workoutId}`)
          })
        } catch (error) {
          console.error(error);
        }
      };

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
                    label="Workout Type"
                    onChange={handleChange}
                >
                    <MenuItem value={"CST"}>Chest, Shoulder & Triceps</MenuItem>
                    <MenuItem value={"BB"}>Back & Biceps</MenuItem>
                    <MenuItem value={"LEG"}>Legs</MenuItem>
                    <MenuItem value={"CALI"}>Calisthenics</MenuItem>
                </Select>
            </div>
            <button
                disabled={!workoutType}
                onClick={startWorkout}
                className={`w-32 h-32 rounded-full text-xl font-bold transition duration-300 ${
                    workoutType ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                Start
            </button>
            {inProgressWorkoutId && (
                <div className="mt-3">
                    <InProgressWorkoutTile workoutId={inProgressWorkoutId} workoutType={inProgressWorkoutType}/>
                </div>
                
            )}
            {lastCompletedWorkout && (
                <div className="mt-6">
                    <LastCompletedWorkoutTile workout={lastCompletedWorkout}/>
                </div>
            )}
        </div>
    );
}