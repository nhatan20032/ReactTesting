import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

interface Props {
  children: React.ReactNode;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const loginStatus = useSelector((state: RootState) => state.login.statusLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
    }
  }, [loginStatus, navigate]);

  return loginStatus ? <>{children}</> : null;
};

export default RequireAuth;
