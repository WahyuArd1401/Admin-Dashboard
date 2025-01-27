export const loginUser = (user) => {
  localStorage.setItem("authUser", JSON.stringify(user));
  localStorage.setItem("isAuthenticated", "true");
};

export const logoutUser = () => {
  localStorage.removeItem("authUser");
  localStorage.setItem("isAuthenticated", "false");
};

export const getAuthStatus = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const getAuthUser = () => {
  return JSON.parse(localStorage.getItem("authUser"));
};

export const updateAuthUser = (user) => {
  localStorage.setItem("authUser", JSON.stringify(user));
};

export const getItems = () => {
  return JSON.parse(localStorage.getItem("items")) || [];
};

export const saveItems = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

