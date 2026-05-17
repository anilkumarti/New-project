import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default DashboardCard;
