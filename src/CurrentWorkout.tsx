import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"
import { EXERCISE_TYPES } from "./constants";
import { LastRecordedExercise } from "./LastRecordedExercise";

interface CurrentWorkoutProps {
    userId: string;
    endpoint: string
}
export const CurrentWorkout = ({userId, endpoint}: CurrentWorkoutProps) => {
    const { workoutId } = useParams()
    const [workoutType, setWorkoutType] = useState<string>()
    const [exerciseType, setExerciseType] = useState('');
    const [reps, setReps] = useState<number | undefined>(undefined);
    const [weight, setWeight] = useState<number | undefined>(undefined);
    const [srNo, setSrNo] = useState<number | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastRecordedExerciseId, setLastRecordedExerciseId] = useState<string | undefined>()
    const [lastRecordedExercise, setLastRecordedExercise] = useState<any>()
    console.log("last recorded exercise: ", lastRecordedExercise)

    const navigate = useNavigate()
    useEffect(() => {
        axios.get(endpoint + `/api/v1/workouts/${userId}/workout/${workoutId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(({ data }) => {
            const workoutInProgress = data
            setWorkoutType(workoutInProgress?.workoutType)
            axios.get(endpoint + `/api/v1/workouts/${userId}/workout/${workoutId}/exercises/latest`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(({ data }) => {
                setLastRecordedExerciseId(data?.exerciseId)
                setLastRecordedExercise(data)
            })
        })
    }, [workoutId, lastRecordedExerciseId])

    const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExerciseType(event.target.value);
    };

    const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReps(parseInt(event.target.value));
    };
    const handleSrNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSrNo(parseInt(event.target.value));
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(parseFloat(event.target.value));
    };

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data = {
            reps: reps,
            srNo: srNo,
            weight: weight,
            exerciseType: exerciseType,
            createdAt: new Date().toISOString(),
          };
        setIsSubmitting(true)
          try {
            await axios.post(
              endpoint+ `/api/v1/workouts/${workoutId}/exercise`,
              data,
              {
                headers: { 
                  'Content-Type': 'application/json',
                },
                maxBodyLength: Infinity
              }
            ).then(({ data }) => {
                    setLastRecordedExerciseId(data?.exerciseId)
                    setLastRecordedExercise(data)
                  setIsSubmitting(false)
                  setExerciseType('');
                  setReps(undefined);
                  setWeight(undefined);
          })}catch (error) {
            console.error(error);
          }
    };

    const handleEndWorkout = async() => {
        // Add logic to handle ending the workout
        await axios.patch(endpoint+`/api/v1/workouts/${userId}/workout/${workoutId}`)
        .then(({ data }) => {
            navigate("/")
        })
    };

    const navigateBack = () => {
        navigate(-1)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">
                Ready to Crush Your {workoutType} Workout Today? Let's Get Started!
            </h1>
            <form onSubmit={handleSubmit} className="w-96 p-8 bg-white shadow-lg rounded-lg">
                <div className="mb-4">
                    <label htmlFor="exerciseType" className="block mb-2 text-lg font-semibold text-gray-700">
                        Exercise Type
                    </label>
                    <select
                        id="exerciseType"
                        value={exerciseType}
                        onChange={handleExerciseChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="" disabled>Select exercise type</option>
                        {
                        
                        EXERCISE_TYPES[workoutType as string]?.map((exerciseTypeDetail: any, index: number) => {
                            return <option value={exerciseTypeDetail.value}>{exerciseTypeDetail.label}</option>
                        })
                    }
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="srNo" className="block mb-2 text-lg font-semibold text-gray-700">
                        SrNo
                    </label>
                    <input
                        type="number"
                        id="srNo"
                        value={srNo ?? ''}
                        onChange={handleSrNo}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="weight" className="block mb-2 text-lg font-semibold text-gray-700">
                        Weight (lbs)
                    </label>
                    <input
                        type="number"
                        id="weight"
                        value={weight ?? ''}
                        onChange={handleWeightChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="reps" className="block mb-2 text-lg font-semibold text-gray-700">
                        Reps
                    </label>
                    <input
                        type="number"
                        id="reps"
                        value={reps ?? ''}
                        onChange={handleRepsChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className={`w-32 rounded-lg p-2 transition duration-300 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={handleEndWorkout} className="w-32 bg-red-500 text-white rounded-lg p-2 hover:bg-red-700 transition duration-300">
                        End Workout
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <button type="button" className="text-gray-700 hover:text-gray-900 transition duration-300" onClick={navigateBack}>
                        <FaArrowLeft size={24} />
                    </button>
                </div>
            </form>
            {lastRecordedExercise && (
                <LastRecordedExercise lastRecordedExercise={lastRecordedExercise}/>
            )}
        </div>
    )
}