import { Card, CardContent, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";

interface LastCompletedWorkoutTileProps {
    workout: any;
}

const LastCompletedWorkoutTile = ({ workout }: LastCompletedWorkoutTileProps) => {
    return (
        <Card className="mt-6 w-full p-4 bg-white shadow-lg rounded-lg border-l-4 border-indigo-600">
            <CardContent>
                <div className="flex items-center mb-4">
                    <FitnessCenterIcon className="text-indigo-600 mr-2" />
                    <Typography variant="h5" component="div" className="font-semibold text-indigo-800">
                        Last Completed Workout
                    </Typography>
                </div>
                <Typography variant="body1" component="div" className="mt-2 text-gray-700 flex items-center">
                    <strong className="mr-2">Type:</strong> {workout.workoutType}
                </Typography>
                <Typography variant="body1" component="div" className="mt-2 text-gray-700 flex items-center">
                    <AccessTimeIcon className="text-gray-600 mr-2" />
                    <strong className="mr-1">Start:</strong> {new Date(workout.start).toLocaleString()}
                </Typography>
                <Typography variant="body1" component="div" className="mt-2 text-gray-700 flex items-center">
                    <AccessTimeIcon className="text-gray-600 mr-2" />
                    <strong className="mr-1">End:</strong> {new Date(workout.end).toLocaleString()}
                </Typography>
                <Typography variant="body1" component="div" className="mt-2 text-gray-700 flex items-center">
                    <DoneIcon className="text-green-600 mr-2" />
                    <strong className="mr-1">Status:</strong> {workout.status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LastCompletedWorkoutTile;
