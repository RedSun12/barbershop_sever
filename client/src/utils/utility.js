// import Cookies from "js-cookie";
// // import { COOKIES } from "../constants/index";

// export const getAuthCookies = () => {
//   return {
//     accessToken: Cookies.get(COOKIES.accessToken) || "",
//     refreshToken: Cookies.get(COOKIES.refreshToken) || "",
//   };
// };

export const getCookies = (name) => {
  const cookieValue = document.cookie.split('; ').find((row) => row.startsWith(name + '='))?.split('=')[1];
  return cookieValue;
};