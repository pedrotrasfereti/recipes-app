export function loadLocalStorage(key) {
  const getLocalStorage = JSON.parse(localStorage.getItem(key)); // Recebe a key do LocalStorage
  return getLocalStorage;
}

export function saveLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
