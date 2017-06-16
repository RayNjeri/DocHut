export const getAuthToken = () => window.localStorage.getItem('token');

export const setAuthToken = token => window.localStorage.setItem('token', token);

export const removeAuthToken = () => window.localStorage.removeItem('token');

export const getUserFromToken = () => {
  const token = getAuthToken();
  return token ? JSON.parse(window.atob(token.split('.')[1])) : null;
};
