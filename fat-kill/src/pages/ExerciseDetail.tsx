import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExerciseById } from '../services/exerciseDatabase';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const exercise = getExerciseById(id || '');

  if (!exercise) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Exercise not found</h1>
        <Link to="/exercises" className="text-purple-600 hover:underline">
          Back to Exercises
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/exercises" className="flex items-center text-purple-600 hover:underline mb-6">
        <ArrowLeftIcon className="mr-2" />
        Back to Exercises
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={exercise.image} alt={exercise.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{exercise.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-lg text-gray-500">{exercise.category}</span>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
              exercise.level === 'Beginner' ? 'bg-green-200 text-green-800' :
              exercise.level === 'Intermediate' ? 'bg-yellow-200 text-yellow-800' :
              'bg-red-200 text-red-800'
            }`}>
              {exercise.level}
            </span>
          </div>
          <p className="text-lg mb-6">{exercise.description}</p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Calories Burned</h2>
            <p className="text-3xl font-bold text-purple-600">
              {exercise.caloriesBurned}
              <span className="text-lg font-normal text-gray-500">
                {exercise.category === 'Cardio' ? ' per mile' : exercise.category === 'Abs' ? ' per minute' : ' per set'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
