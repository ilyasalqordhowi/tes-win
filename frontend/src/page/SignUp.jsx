import React from "react";
import ProductImg from "../assets/img/product.jpeg";
import Logo from "../assets/component/logo";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import loadingGif from "../assets/img/loading.gif";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

function SignUp() {
  const navigate = useNavigate();
  const [pass, setPass] = React.useState("password");
  const [loading, setLoading] = React.useState(false);
  const togglePasswordVisibility = () => {
    setPass((prev) => (prev === "password" ? "text" : "password"));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(7, "Username must be a minimum of 7 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .matches(
          /@(gmail|mail)\.com$/,
          "Email must contain '@gmail.com' or '@mail.com'"
        )
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      gender: Yup.number()
        .oneOf([1, 2], "Please select your gender")
        .required("Gender is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new URLSearchParams();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("gender", values.gender);

        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log(result);
        if (response) {
          navigate("/signin");
        } else {
          alert(result.message || "Registration failed.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex bg-blue-700 h-[100vh]">
      <div className="w-full hidden md:flex items-center justify-center">
        <img className="w-screen h-screen" src={ProductImg} alt="Product" />
      </div>
      <div className="flex items-center md:w-[40%] w-full justify-center flex-col gap-5 p-[100px]">
        <div className="w-full">
          <Logo />
        </div>
        <div className="flex flex-col justify-center w-full">
          <h1 className="font-bold text-[#E4F1FF] text-[20px]">Sign Up</h1>
          <div className="flex gap-[10px]">
            <p className="text-white">Already have an account?</p>
            <Link to="/signin">
              <span className="text-[#27005D]">Log In</span>
            </Link>
          </div>
        </div>

        <form
          className="w-full flex flex-col gap-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-full flex flex-col gap-5">
            <input
              className="w-full border outline-none rounded-2xl p-[10px]"
              name="username"
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username && (
              <p className="font-bold text-red-300">{formik.errors.username}</p>
            )}

            <input
              className="w-full border outline-none rounded-2xl p-[10px]"
              name="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="font-bold text-red-300">{formik.errors.email}</p>
            )}

            <div className="flex items-center bg-white rounded-2xl p-[10px] border">
              <input
                className="flex-1 outline-none"
                name="password"
                type={pass}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                <FaEye />
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="font-bold text-red-300">{formik.errors.password}</p>
            )}

            <div className="flex flex-col gap-2">
              <p className="text-white">Gender</p>
              <div className="flex items-center  gap-32">
                <label className="text-white">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={formik.values.gender === 1}
                    onChange={() => formik.setFieldValue("gender", 1)}
                  />
                  Male
                </label>
                <label className="text-white">
                  <input
                    type="radio"
                    name="gender"
                    value="2"
                    checked={formik.values.gender === 2}
                    onChange={() => formik.setFieldValue("gender", 2)}
                  />
                  Female
                </label>
              </div>
              {formik.errors.gender && formik.touched.gender && (
                <p className="font-bold text-red-300">{formik.errors.gender}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#27005D] rounded-2xl w-full text-[#7BC9FF] h-[40px]"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>

      {loading && (
        <div className="absolute flex bg-black/50 w-full h-screen top-0 left-0 items-center justify-center">
          <div className="bg-[#AED2FF] flex items-center gap-[20px] rounded-md p-[10px]">
            <img className="w-[100px]" src={loadingGif} alt="Loading" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
