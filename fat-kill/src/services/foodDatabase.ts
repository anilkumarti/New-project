export interface FoodData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const foodDatabase: FoodData[] = [
  { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 12 },
  { name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
  { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
  { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 49 },
  { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Oats', calories: 389, protein: 17, carbs: 66, fat: 7 },
];

export const searchFood = (query: string): FoodData[] => {
  if (!query) return [];
  return foodDatabase.filter(food =>
    food.name.toLowerCase().includes(query.toLowerCase())
  );
};
