import axios from "axios";

// TODO : AXIOS CONFIG
const axiosClient = axios.create({
  baseURL: `http://localhost:5000/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// TODO : AXIOS INTERCEPT

export const axiosPrivate = axios.create({
  baseURL: `http://localhost:5000/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// TODO : API CALLS

// user login (return jwt token)
export const axiosLogin = async data => {
  try {
    return await axiosClient.post("/auth/login", JSON.stringify(data), {
      withCredentials: true,
    });
  } catch (err) {
    return console.log(err);
  }
};

// get new jwt token (refresh the token)
export const axiosRefreshToken = async () => {
  try {
    return await axiosClient.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
  } catch (err) {
    return console.log(err);
  }
};

/*
TODO : 
  * CHECK IF INTERCEPTERS WORK 
  * HANDLE USE-EFFECTS IN YOUR APP
  * ENHANCE HOOKS 
  * REFACTOR 
*/
