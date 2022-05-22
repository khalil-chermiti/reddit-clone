import { setNewToken } from "../redux/user/userSlice";
import { axiosRefreshToken } from "../api/axios";
import { useDispatch } from "react-redux";

function useRefresh() {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axiosRefreshToken();

    if (response?.data?.jwt) dispatch(setNewToken(response.data.jwt));
    if (!response?.data?.jwt) console.log("couldn't get new jwt");

    return response?.data?.jwt;
  };

  return refresh;
}

export default useRefresh;
