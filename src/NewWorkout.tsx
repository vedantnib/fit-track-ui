// src/StartWorkout.tsx
import React, { useState } from 'react';

export const NewWorkout = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [reps, setReps] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);

  const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExerciseType(event.target.value);
  };

  const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReps(parseInt(event.target.value));
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseInt(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted with:', {
      exerciseType,
      reps,
      weight,
    });
    // Add logic to handle form submission (e.g., sending data to server)
    // Reset form fields if needed
    setExerciseType('');
    setReps(undefined);
    setWeight(undefined);
  };

  const handleEndWorkout = () => {
    // Add logic to handle ending the workout
    console.log('Ending workout...');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Ready to Crush Your Workout Today? Let's Get Started!
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
            <option value="bench-press">Bench Press</option>
            <option value="squats">Squats</option>
            <option value="deadlifts">Deadlifts</option>
            <option value="bicep-curls">Bicep Curls</option>
            <option value="tricep-extensions">Tricep Extensions</option>
            <option value="cardio">Cardio</option>
          </select>
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
        <div className="flex justify-between">
          <button type="submit" className="w-32 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-300">
            Submit
          </button>
          <button type="button" onClick={handleEndWorkout} className="w-32 bg-red-500 text-white rounded-lg p-2 hover:bg-red-700 transition duration-300">
            End Workout
          </button>
        </div>
      </form>
    </div>
  );
};
