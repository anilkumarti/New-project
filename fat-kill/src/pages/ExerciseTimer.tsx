import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ReloadIcon } from '@radix-ui/react-icons';
import DashboardCard from '../components/DashboardCard';

const ExerciseTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0 && interval !== null) {
      clearInterval(interval);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive, time]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Exercise Timer</h1>
      <DashboardCard title="Timer">
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-8xl font-bold mb-8">{formatTime(time)}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="p-4 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            >
              {isActive ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setTime(0);
              }}
              className="p-4 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
            >
              <ReloadIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default ExerciseTimer;
