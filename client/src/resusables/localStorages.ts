export const getItem = (name: string) => JSON.parse(localStorage.getItem(name) || "[]");

export const setItem = (name: string, value: any) => localStorage.setItem(name, JSON.stringify(value));