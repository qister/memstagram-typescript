// import { authLoginAxios } from "../API/memesAPI";

export const AUTH_STARTED = "AUTH_STARTED";
export const AUTH_COMPLETED = "AUTH_COMPLETED";
export const AUTH_FAILED = "AUTH_FAILED";
export const LOGGED_IN = "LOGGED_IN";

// export const authStarted = () => {
//   console.log("authStarted");
//   return {
//     type: AUTH_STARTED,
//   };
// };

// export const authCompleted = (data) => {
//   return {
//     type: AUTH_COMPLETED,
//     payload: data,
//   };
// };

// export const authFailed = (error) => {
//   return {
//     type: AUTH_FAILED,
//     payload: error,
//   };
// };

// export const login = (data) => {
//   localStorage.setItem(
//     "userData",
//     JSON.stringify({
//       userId: data.userId,
//       token: data.token,
//       email: data.email,
//     })
//   );
//   return {
//     type: LOGGED_IN,
//   };
// };

// export const authLogin = (credentials) => {
//   console.log("authLogin credentials", credentials);
//   return async function (dispatch) {
//     dispatch(authStarted());
//     await authLoginAxios(credentials)
//       .then((data) => dispatch(authCompleted(data)))
//       .then((data) => dispatch(login(data)))
//       .catch((error) => dispatch(authFailed(error)));
//   };
// };
