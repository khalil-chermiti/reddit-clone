import { useSelector } from "react-redux";
import { selectAuth } from "../redux/user/userSlice";

function useAuth() {
  const auth = useSelector(selectAuth);
  return auth;
}

export default useAuth;
