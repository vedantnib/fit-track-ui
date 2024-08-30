import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaDumbbell, FaListOl, FaWeight, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface WorkoutViewProps {
    userId: string;
    endpoint: string;
}

interface Exercise {
    exerciseId: string;
    exerciseType: string;
    reps: number;
    weight: number;
    srNo: number;
}

export const WorkoutView = ({ userId, endpoint }: WorkoutViewProps) => {
    const { workoutId } = useParams<{ workoutId: string }>();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${endpoint}/api/v1/workouts/${userId}/workout/${workoutId}/exercises`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(({ data }) => {
            setExercises(data);
        }).catch(error => {
            console.error("Error fetching exercises:", error);
        });
    }, [userId, workoutId, endpoint]);

    const toggleGroup = (exerciseType: string) => {
        setExpandedGroups(prevState => ({
            ...prevState,
            [exerciseType]: !prevState[exerciseType]
        }));
    };

    const groupedExercises = exercises.reduce((groups: { [key: string]: Exercise[] }, exercise) => {
        if (!groups[exercise.exerciseType]) {
            groups[exercise.exerciseType] = [];
        }
        groups[exercise.exerciseType].push(exercise);
        return groups;
    }, {});

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-10 bg-gray-100">
            <div className="flex w-full items-center justify-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Workout Details</h1>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1 w-full px-4">
                {Object.keys(groupedExercises).map((exerciseType) => (
                    <div key={exerciseType} className="w-full max-w-md p-4 bg-gray-200 rounded-lg shadow-lg">
                        <div
                            onClick={() => toggleGroup(exerciseType)}
                            className="flex justify-between items-center cursor-pointer"
                        >
                            <h2 className="text-lg font-bold text-gray-800">
                                {exerciseType} Exercises
                            </h2>
                            {expandedGroups[exerciseType] ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {expandedGroups[exerciseType] && (
                            <div className="mt-4">
                                {groupedExercises[exerciseType].map((exercise) => (
                                    <div
                                        key={exercise.exerciseId}
                                        onClick={() => navigate(`/workout/${workoutId}/exercises/${exercise.exerciseId}/update`)}
                                        className="flex flex-col items-center justify-center w-full p-4 bg-blue-500 text-white rounded-lg shadow-lg transition duration-300 mb-4"
                                    >
                                        <div className="flex items-center mb-2">
                                            <FaDumbbell className="text-white mr-2" />
                                            <p className="text-lg"><strong>Type:</strong> {exercise.exerciseType}</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <FaListOl className="text-white mr-2" />
                                            <p className="text-lg"><strong>Reps:</strong> {exercise.reps}</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <FaWeight className="text-white mr-2" />
                                            <p className="text-lg"><strong>Weight:</strong> {exercise.weight} lbs</p>
                                        </div>
                                        <div className="flex items-center">
                                            <FaListOl className="text-white mr-2" />
                                            <p className="text-lg"><strong>SrNo:</strong> {exercise.srNo}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
