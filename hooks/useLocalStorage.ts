import { useState, useEffect } from 'react';

function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return defaultValue;
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}
