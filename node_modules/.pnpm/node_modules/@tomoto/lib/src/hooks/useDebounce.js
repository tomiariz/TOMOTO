// filepath: c:\Users\Administrador\Desktop\FOLDERS\Web Development\TOMOTO\packages\lib\src\hooks\useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Hook para debounce
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}