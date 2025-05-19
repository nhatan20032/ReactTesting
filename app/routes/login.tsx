import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import apiUrls from "~/apiUrls";
import { useDispatch } from "react-redux";
import { setStatus } from "~/redux/loginSlice";

interface loginInput {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<loginInput>();

  const onSubmit: SubmitHandler<loginInput> = async (data) => {
    const { username, password } = data;

    if (!username || username.trim() === "") {
      setError("username", { message: "Vui lòng nhập tên đăng nhập" });
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      setError("username", { message: "Username không hợp lệ" });
      return;
    }

    if (!password || password.trim() === "") {
      setError("password", { message: "Vui lòng nhập mật khẩu" });
      return;
    } else if (password.length > 20 || password.length < 8) {
      setError("password", { message: "Mật khẩu phải có từ 8-20 ký tự" });
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("password", { message: "Mật khẩu phải có chữ cái in hoa " });
      return;
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      setError("password", { message: "Mật khẩu phải có kí tự đặc biệt" });
      return;
    }

    try {
      const response = await axios.post(apiUrls.login, { username, password });
      dispatch(
        setStatus({
          statusLogin: true,
          username: response.data.data.username,
        })
      );
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.data.accessToken)
      );
      navigate("/home");
    } catch (error: any) {
      if (error?.response?.status === 500) {
        setError("password", {
          message: "Sai thông tin đăng nhập, vui lòng kiểm tra lại",
        });
      } else {
        setError("password", { message: `Lỗi: ${error.message}` });
      }
    }
  };

  return (
    <div className="w-1/2 text-black shadow-2xl bg-amber-50 p-5 rounded-2xl shadow-amber-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            id="username"
            type="text"
            className="w-1/2 border border-black"
          />
          {errors.username && (
            <span className="text-red-600 text-sm mt-1">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="w-1/2 border border-black"
          />
          {errors.password && (
            <span className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <button type="submit" className="border p-2 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
}
