import { FaDumbbell, FaEdit, FaListOl, FaWeight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface LastRecordedExerciseProps {
    lastRecordedExercise: any;
    workoutId: string
}

export const LastRecordedExercise = ({lastRecordedExercise, workoutId}: LastRecordedExerciseProps) => {
    const navigate = useNavigate()
    const handleEditClick = () => {
        navigate(`/workout/${workoutId}/exercises/${lastRecordedExercise.exerciseId}/update`)
    }
    return <div className="w-96 p-8 bg-white shadow-lg rounded-lg mt-6 border-t-4 border-blue-500">
    <div className="flex flex-row space-x-3">
        <div className="w-[70%]">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Last Recorded Exercise</h2>    
        </div>
        <FaEdit
                className="text-blue-500 cursor-pointer justify-center mt-1"
                onClick={handleEditClick}
            />
    </div>
    <div className="flex items-center mb-2">
        <FaDumbbell className="text-blue-500 mr-2" />
        <p className="text-lg text-gray-700"><strong>Type:</strong> {lastRecordedExercise.exerciseType}</p>
    </div>
    <div className="flex items-center mb-2">
        <FaListOl className="text-blue-500 mr-2" />
        <p className="text-lg text-gray-700"><strong>Reps:</strong> {lastRecordedExercise.reps}</p>
    </div>
    <div className="flex items-center mb-2">
        <FaWeight className="text-blue-500 mr-2" />
        <p className="text-lg text-gray-700"><strong>Weight:</strong> {lastRecordedExercise.weight} lbs</p>
    </div>
    <div className="flex items-center">
        <FaListOl className="text-blue-500 mr-2" />
        <p className="text-lg text-gray-700"><strong>SrNo:</strong> {lastRecordedExercise.srNo}</p>
    </div>
</div>
}