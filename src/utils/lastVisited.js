export const saveLastVisited = (path) => {
  localStorage.setItem("lastVisited", path);
};

export const getLastVisited = () => {
  return localStorage.getItem("lastVisited");
};  