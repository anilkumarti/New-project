export interface Exercise {
  id: string;
  name: string;
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulder' | 'Cardio' | 'Abs';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  caloriesBurned: number; // per set or minute
  image: string;
}

export const exerciseDatabase: Exercise[] = [
  {
    id: '1',
    name: 'Push-up',
    category: 'Chest',
    level: 'Beginner',
    description: 'A classic bodyweight exercise that works the chest, shoulders, and triceps.',
    caloriesBurned: 10,
    image: '/src/assets/exercises/pushup.png',
  },
  {
    id: '2',
    name: 'Pull-up',
    category: 'Back',
    level: 'Intermediate',
    description: 'A challenging bodyweight exercise that targets the back and biceps.',
    caloriesBurned: 15,
    image: '/src/assets/exercises/pullup.png',
  },
  {
    id: '3',
    name: 'Squat',
    category: 'Legs',
    level: 'Beginner',
    description: 'A fundamental lower body exercise that works the quads, hamstrings, and glutes.',
    caloriesBurned: 12,
    image: '/src/assets/exercises/squat.png',
  },
  {
    id: '4',
    name: 'Overhead Press',
    category: 'Shoulder',
    level: 'Intermediate',
    description: 'A great exercise for building shoulder strength and size.',
    caloriesBurned: 8,
    image: '/src/assets/exercises/overhead_press.png',
  },
  {
    id: '5',
    name: 'Running',
    category: 'Cardio',
    level: 'Beginner',
    description: 'A simple and effective cardio exercise for improving cardiovascular health.',
    caloriesBurned: 100, // per mile
    image: '/src/assets/exercises/running.png',
  },
  {
    id: '6',
    name: 'Plank',
    category: 'Abs',
    level: 'Beginner',
    description: 'An isometric core exercise that strengthens the abs, back, and shoulders.',
    caloriesBurned: 5, // per minute
    image: '/src/assets/exercises/plank.png',
  },
];

export const getExercisesByCategory = (category: string): Exercise[] => {
  return exerciseDatabase.filter(exercise => exercise.category === category);
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return exerciseDatabase.find(exercise => exercise.id === id);
};
