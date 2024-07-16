import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface AllWorkoutsProps {
    endpoint: string;
    userId: string;
}

export const AllWorkouts = ({ endpoint, userId }: AllWorkoutsProps) => {
    const [completedWorkouts, setCompletedWorkouts] = useState<any[]>([]);
    const [resultsLimit, setResultsLimit] = useState<number>(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompletedWorkouts();
    }, [resultsLimit]);

    const fetchCompletedWorkouts = () => {
        axios.get(`${endpoint}/api/v1/workouts/${userId}?status=COMPLETED&limit=${resultsLimit}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(({ data }) => {
            setCompletedWorkouts(data);
        }).catch(error => {
            console.error("Error fetching completed workouts:", error);
        });
    };

    const handleLimitChange = (event: SelectChangeEvent<number>) => {
        setResultsLimit(event.target.value as number);
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-10 bg-gray-100">
            <div className="flex w-full items-center justify-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Completed Workouts</h1>
            </div>
            <div className="flex items-center justify-center mb-4">
                <label className="mr-2 text-lg font-semibold text-gray-700">Number of Results:</label>
                <Select
                    value={resultsLimit}
                    onChange={handleLimitChange}
                    className="w-20"
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1 w-full px-4">
                {completedWorkouts.map((workout) => (
                    <div
                        key={workout.workoutId}
                        className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-green-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition duration-300"
                        onClick={() => navigate(`/workout/${workout.workoutId}/view`)}
                    >
                        <h2 className="text-lg font-bold mb-2">{workout.workoutType} Workout</h2>
                        <p className="text-sm">Completed on: {new Date(workout.dateTime).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllWorkouts;
