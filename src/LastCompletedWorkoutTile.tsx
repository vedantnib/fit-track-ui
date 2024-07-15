import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface LastCompletedWorkoutTileProps {
    workout: any;
}

const LastCompletedWorkoutTile = ({ workout }: LastCompletedWorkoutTileProps) => {
    return (
        <Card className="mt-6 w-96 p-4 bg-white shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" component="div" className="font-semibold text-gray-800">
                    Last Completed Workout
                </Typography>
                <Typography variant="body1" component="div" className="mt-2 text-gray-700">
                    <strong>Type:</strong> {workout.workoutType}
                </Typography>
                <Typography variant="body1" component="div" className="mt-2 text-gray-700">
                    <strong>Start:</strong> {new Date(workout.start).toLocaleString()}
                </Typography>
                <Typography variant="body1" component="div" className="mt-2 text-gray-700">
                    <strong>End:</strong> {new Date(workout.end).toLocaleString()}
                </Typography>
                <Typography variant="body1" component="div" className="mt-2 text-gray-700">
                    <strong>Status:</strong> {workout.status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LastCompletedWorkoutTile;
