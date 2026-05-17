import React, { useState } from 'react';
import { useFoodStore, type FoodEntry } from '../store/food';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import FoodForm from '../components/FoodForm';
import { PlusCircledIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

const MealSection: React.FC<{
  title: string;
  entries: FoodEntry[];
  onEdit: (entry: FoodEntry) => void;
  onDelete: (id: string) => void;
}> = ({ title, entries, onEdit, onDelete }) => (
  <DashboardCard title={title}>
    {entries.length === 0 ? (
      <p className="text-gray-500">No entries for this meal.</p>
    ) : (
      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <div>
              <p className="font-semibold">{entry.name}</p>
              <p className="text-sm text-gray-500">
                {entry.calories} kcal | P: {entry.protein}g, C: {entry.carbs}g, F: {entry.fat}g
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => onEdit(entry)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                <Pencil2Icon />
              </button>
              <button onClick={() => onDelete(entry.id)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                <TrashIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </DashboardCard>
);

const Foods: React.FC = () => {
  const { entries, deleteEntry } = useFoodStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FoodEntry | undefined>(undefined);

  const today = new Date().toISOString().split('T')[0];
  const todaysEntries = entries.filter(entry => entry.date === today);

  const breakfastEntries = todaysEntries.filter(entry => entry.mealType === 'breakfast');
  const lunchEntries = todaysEntries.filter(entry => entry.mealType === 'lunch');
  const dinnerEntries = todaysEntries.filter(entry => entry.mealType === 'dinner');
  const snackEntries = todaysEntries.filter(entry => entry.mealType === 'snack');

  const handleAddClick = () => {
    setEditingEntry(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (entry: FoodEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEntry(undefined);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Today's Food Log</h1>
        <button onClick={handleAddClick} className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700">
          <PlusCircledIcon className="mr-2" />
          Add Food
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MealSection title="Breakfast" entries={breakfastEntries} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        <MealSection title="Lunch" entries={lunchEntries} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        <MealSection title="Dinner" entries={dinnerEntries} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        <MealSection title="Snacks" entries={snackEntries} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingEntry ? 'Edit Food Entry' : 'Add Food Entry'}>
        <FoodForm onClose={closeModal} entry={editingEntry} />
      </Modal>
    </div>
  );
};

export default Foods;
