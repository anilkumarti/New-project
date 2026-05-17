import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { exerciseDatabase, type Exercise } from '../services/exerciseDatabase';

const categories = ['Chest', 'Back', 'Legs', 'Shoulder', 'Cardio', 'Abs'];

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
  <Link to={`/exercises/${exercise.id}`}>
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img src={exercise.image} alt={exercise.name} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-bold">{exercise.name}</h3>
      <p className="text-sm text-gray-500">{exercise.category}</p>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
        exercise.level === 'Beginner' ? 'bg-green-200 text-green-800' :
        exercise.level === 'Intermediate' ? 'bg-yellow-200 text-yellow-800' :
        'bg-red-200 text-red-800'
      }`}>
        {exercise.level}
      </span>
    </div>
  </Link>
);

const Exercises: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Chest');

  const filteredExercises = exerciseDatabase.filter(ex => ex.category === selectedCategory);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Exercises</h1>
      <div className="flex space-x-4 mb-6 border-b">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 font-semibold ${selectedCategory === category ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredExercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default Exercises;