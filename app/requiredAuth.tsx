import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./redux/store";
import { setStatus } from "./redux/loginSlice";

interface Props {
  children: React.ReactNode;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    (state: RootState) => state.login.statusLogin
  );
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      dispatch(setStatus(parsedAuth));
    }
    setCheckedAuth(true);
  }, [dispatch]);

  useEffect(() => {
    if (checkedAuth && !loginStatus) {
      navigate("/");
    }
  }, [loginStatus, navigate, checkedAuth]);

  if (!checkedAuth) return null; // chờ check xong localStorage
  return loginStatus ? <>{children}</> : null;
};

export default RequireAuth;
