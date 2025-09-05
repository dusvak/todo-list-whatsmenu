'use client';

import { tv } from 'tailwind-variants';

export type FilterType = 'all' | 'active' | 'completed';

interface FilterControlsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filterButton = tv({
  base: 'px-3 py-1 text-sm font-medium rounded-md transition-colors',
  variants: {
    active: {
      true: 'bg-blue-600 text-white',
      false: 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    },
  },
});

export const FilterControls: React.FC<FilterControlsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex justify-center gap-2 my-6">
      <button
        className={filterButton({ active: activeFilter === 'all' })}
        onClick={() => onFilterChange('all')}
      >
        Todas
      </button>
      <button
        className={filterButton({ active: activeFilter === 'active' })}
        onClick={() => onFilterChange('active')}
      >
        Incompletas
      </button>
      <button
        className={filterButton({ active: activeFilter === 'completed' })}
        onClick={() => onFilterChange('completed')}
      >
        Completas
      </button>
    </div>
  );
};