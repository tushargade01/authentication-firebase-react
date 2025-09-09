import React from "react";
import thankyouImg from "../assets/Thankyou.png";

const PopupModal = ({ open, name, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative animate-fadeIn">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>

        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-semibold">Hey {name}</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-purple-600 my-2">
            Congratulations!
          </h1>
          <p className="text-xl">You have successfully submitted the form.</p>

          <img
            src={thankyouImg}
            alt="thank-you"
            className="h-[150px] mx-auto my-4 animate-pulse"
          />

          <p className="text-lg">
            Wait, you are being redirected to the profile page...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
