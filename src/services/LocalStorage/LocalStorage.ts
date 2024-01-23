const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

const LocalStorageService = {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
};

export default LocalStorageService;
