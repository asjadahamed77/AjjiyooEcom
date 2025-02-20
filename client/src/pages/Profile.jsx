import MyOrderspage from "./MyOrderspage"


const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
      <div className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0">
      {/* Left Section */}
      <div className="w-full  xl:w-1/4 shadow-md rounded-lg p-6 ">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Asjad Ahamed</h1>
      <p className="text-lg text-gray-400 mb-4">
        asjadahamed77@gmail.com
      </p>
      <button className="bg-[var(--mainColor)] hover:opacity-80 py-2 text-sm rounded-lg transition duration-300 text-white w-full cursor-pointer">LOGOUT</button>
      </div>

      <div className="w-full  xl:w-3/4"> 

      <MyOrderspage />

      </div>

      </div>
      </div>
    </div>
  )
}

export default Profile
