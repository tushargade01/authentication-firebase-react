import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);

        if (!doc.empty) {
          const data = doc.docs[0].data();
          setUserDetails(data);
        } else {
          toast.error("No user details found");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while fetching user data");
      } finally {
        setLoadingDetails(false);
      }
    };

    if (loading) return;
    if (!user) return navigate("/login");

    fetchUserDetails();
  }, [loading, navigate, user]);

  // ✅ fallback avatar
  const defaultAvatar =
    "https://www.w3schools.com/howto/img_avatar.png";

  // 🔹 Skeleton Loader (only for profile card)
  const Skeleton = () => (
    <div className="flex flex-col justify-center bg-gray-100 p-5 mt-5 rounded-xl animate-pulse">
      <div className="flex h-[150px] w-[150px] mx-auto bg-gray-300 rounded-full" />
      <div className="space-y-3 mt-5">
        <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-5 bg-gray-300 rounded w-2/3 mx-auto"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto"></div>
        <div className="h-5 bg-gray-300 rounded w-2/5 mx-auto"></div>
      </div>
    </div>
  );

  return (
    <div className="flex-col items-center justify-center">
      {error && <div>{error}</div>}

      {/* 🔹 Header always visible */}
      <div className="flex items-center justify-between py-5">
        <Link to={"/"}>
          <button className="bg-purple-700 text-white text-xs sm:text-base rounded-full py-2 px-5">
            Form Page
          </button>
        </Link>
        <button
          onClick={logout}
          className="bg-purple-700 text-white text-xs sm:text-base rounded-full py-2 px-5"
        >
          Logout
        </button>
      </div>

      <h1 className="text-4xl mb-4 text-center">Profile Page</h1>
      <div className="border-[1px] border-gray-300" />

      {/* 🔹 Show Skeleton only inside profile card */}
      {loadingDetails ? (
        <Skeleton />
      ) : !userDetails ? (
        <p className="text-center mt-5">No profile data available</p>
      ) : (
        <div className="flex flex-col justify-center bg-gray-100 p-3 sm:p-5 mt-5 rounded-xl">
          <div className="flex h-[150px] w-[150px] mx-auto">
            <img
              src={userDetails.img || defaultAvatar}
              alt="user-img"
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          <div className="flex-col items-center justify-center p-1 sm:p-5 text-center">
            <div className="font-semibold text-lg">
              Email :{" "}
              <span className="text-purple-500">{userDetails.email}</span>
            </div>
            <div className="font-semibold text-lg">
              UID : <span className="text-purple-500">{userDetails.uid}</span>
            </div>
            <div className="font-semibold text-lg">
              First Name :{" "}
              <span className="text-purple-500">{userDetails.firstName}</span>
            </div>
            <div className="font-semibold text-lg">
              Last Name :{" "}
              <span className="text-purple-500">{userDetails.lastName}</span>
            </div>
            <div className="font-semibold text-lg">
              Age : <span className="text-purple-500">{userDetails.age}</span>
            </div>
            <div className="font-semibold text-lg">
              Profession :{" "}
              <span className="text-purple-500">{userDetails.profession}</span>
            </div>
            <div className="font-semibold text-lg">
              Address :{" "}
              <span className="text-purple-500">{userDetails.address}</span>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Profile;
