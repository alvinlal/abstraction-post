export const setUserInfo = (data) => {
  if (typeof window != undefined) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
};

export const getUserInfo = () => {
  if (typeof window != undefined) {
    if (localStorage.getItem("userInfo")) {
      return localStorage.getItem("userInfo");
    } else {
      return null;
    }
  }
};
