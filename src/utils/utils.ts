export function setLocaleStorage<T>(key: string, item: T) {
  window.localStorage.setItem(key, JSON.stringify(item))
}

export const getLocaleStorage = (key: string) => {
  const local = window.localStorage.getItem(key)

  if (!local) return;

  return JSON.parse(local)
}
