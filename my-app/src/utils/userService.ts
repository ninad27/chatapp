export const getCurrentUserEmail = () => {
  try {
    const activeUser = sessionStorage.getItem("activeUser");

    if (!activeUser) {
      console.error("user not found");
      return;
    }

    const email = JSON.parse(activeUser).email;

    return email;
  } catch {
    return "";
  }
};

export const getCurrentUserId = () => {
  try {
    const activeUser = sessionStorage.getItem("activeUser");

    if (!activeUser) {
      console.error("user not found");
      return;
    }

    const id = JSON.parse(activeUser).id;

    return id;
  } catch {
    return "";
  }
};
