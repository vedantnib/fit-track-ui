import { FaDumbbell, FaListOl, FaWeight } from "react-icons/fa";

interface LastRecordedExerciseProps {
    lastRecordedExercise: any;
}

export const LastRecordedExercise = ({lastRecordedExercise}: LastRecordedExerciseProps) => {
    return <div className="w-96 p-8 bg-white shadow-lg rounded-lg mt-6 border-t-4 border-blue-500">
    <h2 className="mb-4 text-xl font-semibold text-gray-800">Last Recorded Exercise</h2>
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