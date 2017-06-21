/* eslint no-undef: "off"*/

export const getAuthToken = () => localStorage.getItem('token');

export const setAuthToken = token => localStorage.setItem('token', token);

export const removeAuthToken = () => localStorage.removeItem('token');


export const getUserFromToken = () => {
  const token = getAuthToken();
  return token ? JSON.parse(window.atob(token.split('.')[1])) : null;
};
