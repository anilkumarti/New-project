import React from 'react';
import { useProgressStore } from '../store/progress';
import { useFoodStore } from '../store/food';
import DashboardCard from '../components/DashboardCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const Progress: React.FC = () => {
  const { weightEntries, workoutEntries } = useProgressStore();
  const { entries: foodEntries } = useFoodStore();

  // Prepare data for calorie chart
  const calorieData = foodEntries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += entry.calories;
    return acc;
  }, {} as Record<string, number>);

  const weeklyCalorieData = Object.keys(calorieData).map(date => ({
    date,
    calories: calorieData[date],
  })).slice(-7);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardCard title="Weekly Calorie Intake">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyCalorieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calories" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Weight Progress">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightEntries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Workout Consistency" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutEntries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="duration" fill="#ffc658" name="Workout Duration (min)" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Progress;