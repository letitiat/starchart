export const setLocaleStorage = (key: string, item: Record<string, any>) => window.localStorage.setItem(key, JSON.stringify(item))

export const getLocaleStorage = (key: string) => {
  const local = window.localStorage.getItem(key)

  if (!local) return;

  return JSON.parse(local)
}
