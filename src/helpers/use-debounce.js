import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const removeExtraSpace = s =>
  s
    .trim()
    .split(/ +/)
    .join(" ");

  useEffect(
    () => {
      if(value.length > 3){
        const handler = setTimeout(() => {
          setDebouncedValue(removeExtraSpace(value));
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      }
    },
    [value, delay] 
  );
  return debouncedValue;
}