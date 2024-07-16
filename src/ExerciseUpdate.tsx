import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaDumbbell, FaListOl, FaWeight, FaCalendar } from "react-icons/fa";

interface ExerciseUpdateProps {
    userId: string;
    endpoint: string;
}

export const ExerciseUpdate = ({userId, endpoint}: ExerciseUpdateProps) => {
    const { workoutId, exerciseId } = useParams()
    const [exerciseType, setExerciseType] = useState("");
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [srNo, setSrNo] = useState(0);
    const [createdAt, setCreatedAt] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${endpoint}/api/v1/workouts/${userId}/workout/${workoutId}/exercises/${exerciseId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(({ data }) => {
            setExerciseType(data.exerciseType)
            setReps(data.reps)
            setWeight(data.weight)
            setSrNo(data.srNo)
            setCreatedAt(data.createdAt)
        })
        .catch(error => {
            console.error("Error fetching exercise details:", error);
        });
    }, [workoutId, exerciseId, endpoint, userId])

    const handleSubmit = async () => {
        const updatedExercise = { exerciseId, exerciseType, reps, weight, srNo, createdAt };
        try {
            await axios.patch(`${endpoint}/api/v1/workouts/${userId}/workout/${workoutId}/exercises/${exerciseId}`, updatedExercise, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // Optionally update state or handle success message
        } catch (error) {
            console.error("Error updating exercise:", error);
        }
    };

    const handleBack = () => {
        navigate(-1); // Navigate back
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Update Exercise</h2>
            <div className="mb-4 flex items-center">
                <FaDumbbell className="text-blue-500 mr-2" />
                <input
                    type="text"
                    value={exerciseType}
                    onChange={(e) => setExerciseType(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Exercise Type"
                />
            </div>
            <div className="mb-4 flex items-center">
                <FaListOl className="text-blue-500 mr-2" />
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(parseInt(e.target.value))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Reps"
                />
            </div>
            <div className="mb-4 flex items-center">
                <FaWeight className="text-blue-500 mr-2" />
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Weight (lbs)"
                />
            </div>
            <div className="mb-4 flex items-center">
                <FaListOl className="text-blue-500 mr-2" />
                <input
                    type="number"
                    value={srNo}
                    onChange={(e) => setSrNo(parseInt(e.target.value))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="SrNo"
                />
            </div>
            <div className="mb-4 flex items-center">
                <FaCalendar className="text-blue-500 mr-2" />
                <input
                    type="text"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Created At (Optional)"
                />
            </div>
            <div className="flex justify-end">
                <button onClick={handleBack} className="mr-4 p-2 bg-gray-300 rounded">Back</button>
                <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
        </div>
    );
}