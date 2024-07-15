import { useNavigate } from "react-router-dom";

interface InProgressWorkoutTileProps{
    workoutId: string;
    workoutType?: string;
}
const InProgressWorkoutTile = ({ workoutId, workoutType}: InProgressWorkoutTileProps) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-yellow-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-yellow-600 transition duration-300"
            onClick={() => navigate(`/workout/${workoutId}`)}
        >
            <h2 className="text-lg font-bold mb-2">You have a {workoutType} workout in progress</h2>
            <p className="text-sm">Click to continue your workout</p>
        </div>
    );
};

export default InProgressWorkoutTile;
