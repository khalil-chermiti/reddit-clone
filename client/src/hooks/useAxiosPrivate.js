import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefresh from "../hooks/useRefresh";
import useAuth from "../hooks/useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const auth = useAuth();

  /*
   * refresh and auth are in the dependency array
   * so that each time auth/refresh values change
   * the useEffect updates the intercepters with
   * the new values
   */

  useEffect(() => {
    // intercept request and add jwt token to headers
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.jwt}`;
        }
        return config;
      },
      err => console.log("error occured when intercepting request")
    );

    // intercept response failure and add jwt to header
    const responseIntercept = axiosPrivate.interceptors.response.use(
      function responseSuccess(response) {
        return response;
      },
      function responseError(error) {
        const prevReq = error?.config; // holds prev Request object
        if (error?.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          const newJWT = refresh();
          prevReq.headers["Authorization"] = `Bearer ${newJWT}`;
          axiosPrivate(prevReq);
        }

        return console.log("token expired , retring request");
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
