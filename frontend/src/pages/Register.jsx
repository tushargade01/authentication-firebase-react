import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle, signInWithGithub } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Import images the Vite way
import googleLogo from "../assets/Google.png";
import githubLogo from "../assets/Github.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (fullName === "") {
      toast.error("Full Name is required!");
    } else if (password === "") {
      toast.error("Password is required!");
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
    } else if (email === "") {
      toast.error("Email-id is required!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            toast.error("Email already registered, login to continue");
          } else {
            toast.error("Error occurred, please try again");
          }
        });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="max-w-[100%] mx-auto">
      <div className="flex items-center justify-between text-purple-500 font-bold mt-5 p-1">
        <Link to={"/login"}>
          <div className="cursor-pointer flex items-center text-xs">
            <MdArrowBackIos />
            Back to login
          </div>
        </Link>

        <div className="cursor-pointer text-xs">Need any help?</div>
      </div>
      <h1 className="text-2xl text-gray-800 font-medium text-center mt-5 p-2">
        Registration
      </h1>
      <p className="text-gray-500 leading-5 mb-2 text-center">
        Fill the details to register
      </p>
      {error && <div className="my-4 text-center"> {error.message} </div>}

      {/* Form */}
      <form
        onSubmit={handlesubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="relative">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="my-2 mx-1 w-[270px] xs:w-[360px] md:w-[450px] px-6 py-3 rounded-full outline-none border border-gray-400 focus:border-purple-500 transition"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition">
            {fullName ? "" : "Full Name"}
          </span>
        </label>

        <label className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="my-2 mx-1 w-[270px] xs:w-[360px] md:w-[450px] px-6 py-3 rounded-full outline-none border border-gray-400 focus:border-purple-500 transition"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition">
            {email ? "" : "Email"}
          </span>
        </label>

        <label className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-2 mx-1 w-[270px] xs:w-[360px] md:w-[450px] px-6 py-3 rounded-full outline-none border border-gray-400 focus:border-purple-500 transition"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition">
            {password ? "" : "Password"}
          </span>
        </label>

        {/* Terms */}
        <div className="flex items-center my-2 py-1 justify-center w-[270px] xs:w-[360px] md:w-[450px]">
          <input
            id="link-checkbox"
            type="checkbox"
            className="w-5 h-5 rounded-full text-purple-600 border-gray-300 focus:ring-purple-500"
          />
          <label
            htmlFor="link-checkbox"
            className="ml-4 text-base font-medium text-gray-900"
          >
            I agree with the{" "}
            <span className="text-purple-600 hover:underline">
              terms & conditions
            </span>{" "}
            and{" "}
            <span className="text-purple-600 hover:underline">privacy-policy</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-[270px] xs:w-[360px] md:w-[450px] bg-purple-500 hover:bg-purple-700 p-2 text-white text-base rounded-full mt-5"
        >
          Submit
        </button>
        <ToastContainer />
      </form>

      {/* OR Divider */}
      <div className="flex items-center justify-center mt-5 text-gray-500">
        <div className="border w-[200px] border-gray-300 mr-1" />
        OR
        <div className="border w-[200px] border-gray-300 ml-1"></div>
      </div>

      {/* Social Auth */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => signInWithGoogle()}
          className="w-[270px] xs:w-[360px] md:w-[450px] p-2 bg-white border border-gray-200 text-base font-medium rounded-full mt-5 flex items-center justify-center"
        >
          <img src={googleLogo} alt="google" className="h-[25px] mr-2" />
          With Google
        </button>

        <button
          type="button"
          onClick={() => signInWithGithub()}
          className="w-[270px] xs:w-[360px] md:w-[450px] p-2 bg-gray-100 border text-base font-medium rounded-full my-5 flex items-center justify-center"
        >
          <img src={githubLogo} alt="github" className="h-[30px] mr-2" />
          With Github
        </button>

        <div className="text-gray-600 mt-2 mb-5">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-purple-500 font-medium">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
