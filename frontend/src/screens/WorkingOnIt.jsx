import React from "react";
import Loader from "../components/Loader"; // install lucide-react for icons

const WorkingOnIt = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center m-3 gap-4">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
        <h1 className="text-2xl text-center font-bold text-gray-800">
          We’re Working On It
        </h1>
        <p className="text-gray-600 text-center max-w-md">
          Our backend is under maintenance right now. Please check back in a
          little while. Thanks for your patience!
        </p>
      </div>
    </div>
  );
};

export default WorkingOnIt;
