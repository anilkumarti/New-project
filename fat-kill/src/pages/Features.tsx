import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Features</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Calorie Tracking</h2>
          <p>Log your meals and track your daily calorie intake to stay on top of your diet.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Exercise Logging</h2>
          <p>Keep a record of your workouts and see how many calories you've burned.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Progress Monitoring</h2>
          <p>Visualize your progress with charts and graphs for weight, calories, and more.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Food Database</h2>
          <p>Search from a large database of foods to quickly log your meals.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Weight Tracker</h2>
          <p>Monitor your weight changes over time and stay motivated.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Water Intake</h2>
          <p>Track your daily water consumption to stay hydrated.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
