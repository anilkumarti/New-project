import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DashboardCard from '../components/DashboardCard';

const schema = z.object({
  weight: z.number().min(1, 'Weight is required'),
  height: z.number().min(1, 'Height is required'),
});

type FormData = z.infer<typeof schema>;

const BMICalculator: React.FC = () => {
  const [bmi, setBmi] = useState<number | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const heightInMeters = data.height / 100;
    const bmiValue = data.weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue);
  };

  const getBmiCategory = (bmi: number | null) => {
    if (bmi === null) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">BMI Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DashboardCard title="Calculate Your BMI">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="weight" className="block mb-2 text-sm font-medium">Weight (kg)</label>
              <input type="number" id="weight" {...register('weight', { valueAsNumber: true })} className="w-full p-2 border rounded" />
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
            </div>
            <div>
              <label htmlFor="height" className="block mb-2 text-sm font-medium">Height (cm)</label>
              <input type="number" id="height" {...register('height', { valueAsNumber: true })} className="w-full p-2 border rounded" />
              {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
            </div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700">
              Calculate
            </button>
          </form>
        </DashboardCard>
        <DashboardCard title="Your Result">
          {bmi !== null ? (
            <div className="text-center">
              <p className="text-6xl font-bold">{bmi.toFixed(1)}</p>
              <p className="text-2xl font-semibold">{getBmiCategory(bmi)}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500">Enter your weight and height to see your BMI.</p>
          )}
        </DashboardCard>
      </div>
    </div>
  );
};

export default BMICalculator;
