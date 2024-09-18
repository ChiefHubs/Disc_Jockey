import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 300) => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value]);

  return debounced;
};

export default useDebounce;
