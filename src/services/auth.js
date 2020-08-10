export const TOKEN_KEY = 'x-access-token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, username) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem('username', username);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('username');
};
