import { useDispatch, useSelector } from "react-redux";
import MyOrderspage from "./MyOrderspage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  
  const { user } = useSelector((state) => state.auth || state); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  if (!user) return null; // Or a loading spinner

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0">
          {/* Left Section */}
          <div className="w-full xl:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {user.name || "User"}
            </h1>
            <p className="text-lg text-gray-400 mb-4">
              {user.email || "No email provided"}
            </p>
            <button
              onClick={handleLogout}
              className="bg-[var(--mainColor)] hover:opacity-80 py-2 text-sm rounded-lg transition duration-300 text-white w-full cursor-pointer"
            >
              LOGOUT
            </button>
          </div>

          <div className="w-full xl:w-3/4">
            <MyOrderspage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;