import { useEffect, useState } from "react";
import { getLocaleStorage, setLocaleStorage } from "../utils/utils";

export function useLocalStorageState<T>(
  key: string,
  defaultValue?: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() =>
    getLocaleStorage(key) || defaultValue);

  useEffect(() => setLocaleStorage(key, value))

  return [
    value,
    setValue
  ]
}