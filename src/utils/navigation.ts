export const navigateWithoutRedirect = (targetPath: string) => {
  const currentPath = window.location.pathname;
  if (currentPath !== targetPath) {
    window.history.pushState(null, "", targetPath);
  }
};
