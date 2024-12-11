import React from "react";
import ProductImg from "../assets/img/product.jpeg";
import Logo from "../assets/component/logo";
import { FaEye } from "react-icons/fa6";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { FaRectangleXmark } from "react-icons/fa6";
import { Provider, useSelector, useDispatch } from "react-redux";
import loadingGif from "../assets/img/loading.gif";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { data } from "autoprefixer";
import { login } from "../redux/reducer/auth";
import { addUser } from "../redux/reducer/user";

function Login() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [pass, setPass] = React.useState("password");
  function password() {
    if (pass === "password") {
      setPass("text");
    } else {
      setPass("password");
    }
  }
  const dispatch = useDispatch();
  const formik = useFormik({
    onSubmit: doLogin,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email format")
        .matches(
          /@(gmail|mail)\.com$/,
          "Email must contain '@', 'gmail', 'mail', '.com'"
        )
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
  });
  async function doLogin() {
    setLoading(true);
    const password = formik.values.password;
    const email = formik.values.email;

    const formData = new URLSearchParams();
    formData.append("password", password);
    formData.append("email", email);
    fetch(`http://localhost:5000/login`, {
      method: "POST",
      body: formData,
    }).then((response) => {
      response.json().then((data) => {
        dispatch(addUser(data.result));
        if (data) {
          console.log(data);
          dispatch(login(data.access_token));
          navigate("/");
        } else {
          setLoading(false);
          setMessage(data.message);
          setAlert(true);
        }
      });
    });
  }

  return (
    <div className="flex w-full bg-blue-700 h-[100vh]">
      <div className="flex w-full h-[100vh]">
        <div className=" md:flex w-full hidden items-center md:justify-center">
          <img className="w-screen h-screen" src={ProductImg}></img>
        </div>
        <div className=" flex items-center md:w-[40%] w-full justify-center flex-col gap-5 p-[100px]">
          <div className="w-full">
            <Logo />
          </div>
          <div className="flex flex-col justify-center w-full">
            <h1 className="font-bold text-[#BBE9FF] text-[20px]">Sign In</h1>
            <div className="flex text-[#E4F1FF]">
              <p>Hi, Welcome back to Urticket! </p>
            </div>
          </div>
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="w-full flex flex-col gap-5">
              <input
                className="w-full outline-none border rounded-2xl p-[10px]"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="font-bold text-red-300">{formik.errors.email}</p>
              )}
              <div className="flex bg-white justify-center w-full rounded-2xl p-[10px] border">
                <input
                  className="flex-1 w-full outline-none "
                  name="password"
                  type={pass}
                  placeholder="Password"
                  onChange={formik.handleChange}
                />
                <button onClick={password} type="button">
                  <FaEye />
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="font-bold text-red-300">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <Link
              to="/signup"
              className="flex justify-end text-[#C4E4FF] hover:text-white"
            >
              Dont Have an Account?
            </Link>
            <button
              type="submit"
              className="bg-[#27005D]  rounded-2xl w-full text-[#7BC9FF] h-[40px] "
            >
              Sign In
            </button>
          </form>
          <div className="flex flex-col justify-center text-white items-center gap-[20px]">
            <div>or sign in with</div>
            <div className="flex gap-[16px]">
              <a href="https://accounts.google.com">
                <button className="border-2 border-white w-[96px] flex justify-center p-[10px] rounded-[6px]">
                  <FaGoogle />
                </button>
              </a>
              <a href="https://www.facebook.com/login.php">
                <button className="border-2 border-white w-[96px] flex justify-center p-[10px] rounded-[6px]">
                  <FaFacebook />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {alert ? (
        <div className="absolute flex bg-black/50 w-full h-screen top-0 left-0 items-center justify-center">
          <div className="bg-[#27005D] text-[#AED2FF] w-[375px] flex flex-col items-center gap-[20px] rounded-md p-[10px]">
            <div>{message}</div>
            <button
              className="flex gap-[10px] items-center justify-center"
              onClick={() => setAlert()}
            >
              <FaRectangleXmark />
              <p>Cancel</p>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div className="absolute flex bg-black/50 w-full h-screen top-0 left-0 items-center justify-center">
          <div className="bg-[#AED2FF] flex items-center gap-[20px] rounded-md p-[10px]">
            <img className="w-[100px] " src={loadingGif}></img>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Login;
