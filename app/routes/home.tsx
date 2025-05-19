import { useSelector } from "react-redux";
import RequireAuth from "~/requiredAuth";
import type { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { removeUser } from "~/redux/loginSlice";
import { useNavigate } from "react-router";

export default function Home() {
  const user = useSelector((state: RootState) => state.login.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3">
      {/* <RequireAuth> */}
      <div>Hello {!user ? "Nash Nguyenx" : user}. Welcome to Home Page</div>
      <button
        onClick={() => {
          dispatch(removeUser());
          localStorage.removeItem("token");
          navigate("/");
        }}
        className="bg-amber-50 p-5 rounded-2xl text-black"
      >
        Log out
      </button>
      {/* </RequireAuth> */}
    </div>
  );
}
