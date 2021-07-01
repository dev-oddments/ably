export function saveItem(key: string, value: any) {
  localStorage.setItem(key, value);
}

export function loadItem(key: string): any {
  return localStorage.getItem(key);
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
