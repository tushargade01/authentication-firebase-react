import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  firstName: "",
  lastName: "",
  address: "",
  age: "",
  profession: "",
};

const HomePage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState(initialState);
  const { firstName, lastName, address, age, profession } = data;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName === "") {
      toast.error("First Name is required!");
    } else if (lastName === "") {
      toast.error("Last Name is required!");
    } else if (address === "") {
      toast.error("Enter your Address!");
    } else if (profession === "") {
      toast.error("Enter your Profession!");
    } else if (age === "") {
      toast.error("Age is required!");
    } else {
      try {
        await addDoc(collection(db, "users"), {
          ...data,
          email: user.email,
          uid: user.uid,
          timestamp: serverTimestamp(),
        });

        toast.success("Profile created successfully!");
        navigate("/profile"); // ✅ Redirect directly after success
      } catch (err) {
        toast.error("Error creating profile: " + err.message);
      }
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [user, loading, navigate]);

  return (
    <div>
      {error && <div>{error}</div>}
      <div className="flex items-center justify-between py-4">
        <Link to="/profile">
          <button className="bg-purple-700 text-white text-xs sm:text-base px-5 py-2 rounded-full cursor-pointer">
            Profile
          </button>
        </Link>
        <button
          onClick={logout}
          className="bg-purple-700 text-white text-xs sm:text-base rounded-full py-2 px-5 cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="border-[1px] border-gray-300" />
      <h1 className="text-purple-700 p-3 mt-3 text-center text-base xs:text-xl font-black">
        Hello {user && user.email}
      </h1>
      <h2 className="mt-1 text-2xl text-center">User Details Form</h2>
      <p className="mb-2 text-center text-gray-500">
        Fill all the details to create your profile
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="my-2 w-[270px] xs:w-[360px] md:w-[450px] px-6 py-3 rounded-full border border-gray-400 focus:border-purple-500 outline-none"
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="my-2 w-[270px] xs:w-[360px] md:w-[450px] px-6 py-3 rounded-full border border-gray-400 focus:border-purple-500 outline-none"
        />
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Address"
          className="my-2 w-[270px] xs:w-[360px] md:w-[450px] px-6 py-3 rounded-full border border-gray-400 focus:border-purple-500 outline-none"
        />
        <input
          type="text"
          name="profession"
          value={profession}
          onChange={handleChange}
          placeholder="Profession"
          className="my-2 w-[270px] xs:w-[360px] md:w-[450px] px-6 py-3 rounded-full border border-gray-400 focus:border-purple-500 outline-none"
        />
        <input
          type="text"
          name="age"
          value={age}
          onChange={handleChange}
          placeholder="Age"
          className="my-2 w-[270px] xs:w-[360px] md:w-[450px] px-6 py-3 rounded-full border border-gray-400 focus:border-purple-500 outline-none"
        />

        <button
          type="submit"
          className="bg-violet-700 hover:bg-violet-800 text-white text-base w-[270px] xs:w-[360px] md:w-[450px] py-2 rounded-full transition my-3 cursor-pointer"
        >
          Submit
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default HomePage;
